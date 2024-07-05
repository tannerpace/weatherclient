import { useCallback, useState } from "react"

import Card from "@mui/material/Card"
import { Box, CardContent, Typography, Dialog, Fade, Grow } from "@mui/material"
import CreateLocationPostDialog from "@/dialogs/CreateLocationPost"

import { useEffect } from "react"
import windSpeedToNumber from "@/utils/windSpeedToNumber"
import objectToArray from "@/utils/objectToArray"
import { useAuthContext } from "@/contexts/Auth"
import SessionsListDialog from "@/dialogs/SessionsListDialog"
import { useRouter } from "next/router"
import useLocation from "@/hooks/useLocation"
import Wlist from "./Wlist"
import updateAction from "@/utils/updateAction"
import { useStateMachine } from "little-state-machine"
import SpotMap from "@/components/Home/SpotCard/SpotMap"

import PhotoWithWeatherDescription from "@/components/Home/SpotCard/PhotoWithWeatherDescription"
import useColor from "@/hooks/useColor"
import useColorInverse from "@/hooks/useColorInverse"
import WindSlider from "@/components/Home/SpotCard/WindSlider"
import useWind from "@/hooks/useWind"
import { useTheme } from "@emotion/react"
import ButtonGrid from "@/components/Home/SpotCard/ButtonGrid"
import GameController from "@/components/Home/SpotCard/GameController"
import useSliderColor from "@/hooks/useSliderColor"
import { useDeleteLocation } from "@/hooks/api/locations/useDeleteLocation"
import { useIsTanner } from "../../../hooks/useIsTanner"

export default function SpotCard({ location }) {
  const isTanner = useIsTanner()
  const deleteLocation = useDeleteLocation()
  const [postDialogOpen, setPostDialogOpen] = useState(false)
  const { sliderColor } = useSliderColor()
  //these are reversed bc i hooked it up wrong
  const { windLevel } = useWind()
  const theme = useTheme()
  const color = useColorInverse()
  const colorInverse = useColor()
  const { location_id, location_name } = location
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const viableDirections = objectToArray(location?.viable_directions) || []
  const [goodPeriods, setGoodPeriods] = useState([])
  const [statePeriods, setStatePeriods] = useState([])
  const [goodPeriodsCount, setGoodPeriodsCount] = useState(0)
  const [percentageOfGoodPeriods, setPercentageOfGoodPeriods] = useState(0)
  const [isFiltered, setIsFiltered] = useState(true)
  const history = useRouter()

  useEffect(() => {
    if (location?.hourlyWeather) {
      const filteredPeriods = location.hourlyWeather.filter((period) => {
        const windSpeed = windSpeedToNumber(period.windSpeed)
        const windDirection = period.windDirection
        const viable = viableDirections.includes(windDirection)
        const goodWind = windSpeed >= windLevel
        const isDay = period.isDaytime
        return viable && goodWind && isDay
      })
      setGoodPeriods(filteredPeriods)
      setStatePeriods(filteredPeriods)
      setGoodPeriodsCount(filteredPeriods.length)
      setPercentageOfGoodPeriods(
        Math.round(
          (filteredPeriods.length / location.hourlyWeather.length) * 100
        )
      )
    }
  }, [location, windLevel])

  // const { sessions } = location
  // const locationContext = useLocation()
  // const { setSelectedLocationCoordinates } = locationContext

  const authContext = useAuthContext()
  const appContext = authContext

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const openDialog = () => {
    setOpen(true)
  }

  const loggedIn = appContext?.authUser

  const handleFilterPeriods = useCallback(() => {
    if (isFiltered) {
      setStatePeriods(location.hourlyWeather)
    } else {
      setStatePeriods(goodPeriods)
    }
    setIsFiltered(!isFiltered)
  }, [
    isFiltered,
    location.hourlyWeather,
    goodPeriods,
    setStatePeriods,
    setIsFiltered,
  ])

  const handleViewSessions = useCallback(() => {
    openDialog()
  }, [])

  const state = useStateMachine({ updateAction })

  const handleCreateSession = useCallback(
    (data) => {
      state.actions.updateAction({
        start_lattitude: location.location_latitude,
        start_longitude: location.location_longitude,
        end_lattitude: location.location_latitude,
        end_longitude: location.location_longitude,
        session_start_date_time: data.startTime,
        location_id: location.location_id,
        session_wind_speed: data.windSpeed,
        session_wind_direction: data.windDirection,
      })
      loggedIn ? history.push("/step1") : (window.location.href = "/login")
    },
    [location.location_latitude, location.location_longitude]
  )

  const handleNavToLocationPosts = useCallback(() => {
    history.push(`/locationpost/${location_id}`)
  }, [location_id])

  const handleCreatePostDialogOpen = () => {
    setPostDialogOpen(true)
  }

  const handleCreatePostDialogClose = () => {
    setPostDialogOpen(false)
  }

  const handleDeleteLocation = () => {
    if (isTanner) {
      deleteLocation.mutateAsync(location_id)
    } else {
      console.log("Error not Authorized")
    }
  }

  return (
    <>
      <Grow in={true} timeout={200}>
        <Card
          sx={{
            m: "auto",
            mt: 0,
            width: "100%",
            maxWidth: 450,
            minHeight: 500,
            borderRadius: 2,
            boxShadow: theme.shadows[5],
            backgroundColor: colorInverse,
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": {
              boxShadow: theme.shadows[15],
            },
          }}
        >
          <CardContent
            sx={{
              p: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
              }}
              variant="h3"
              color={color}
              gutterBottom
            >
              {location.location_name}
            </Typography>
            <SpotMap
              location={location}
              goodPeriodsCount={goodPeriodsCount}
              percentageOfGoodPeriods={percentageOfGoodPeriods}
            />
            <Wlist
              statePeriods={statePeriods}
              handleCreateSession={handleCreateSession}
              viableDirections={viableDirections}
            />{" "}
            <Typography
              variant="caption"
              color={"info.main"}
              sx={{
                display: "flex",
                justifyContent: "center",
                fontSize: "clamp(0.9rem, 1vw, 1.3rem)",
                color: sliderColor,
              }}
            >
              {windLevel} mph
            </Typography>
            <GameController
              leftComponent={
                <ButtonGrid
                  isFiltered={isFiltered}
                  handleFilterPeriods={handleFilterPeriods}
                  handleViewSessions={handleViewSessions}
                  handleExpandClick={handleExpandClick}
                  handleCreatePostDialogOpen={handleCreatePostDialogOpen}
                  handleNavToLocationPosts={handleNavToLocationPosts}
                  handleDeleteLocation={handleDeleteLocation}
                />
              }
              rightComponent={<WindSlider />}
            />
            <Box
              sx={{
                backgroundColor: colorInverse,
                display: "flex",
                flexDirection: "row",
                overflow: "auto",
              }}
            ></Box>
            {location && (
              <SessionsListDialog
                location_id={location_id}
                title={location?.location_name}
                viableDirections={viableDirections}
                open={open}
                onClose={handleClose}
              />
            )}
          </CardContent>
        </Card>
      </Grow>
      {expanded && (
        <Dialog
          open={expanded}
          onClose={handleExpandClick}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <PhotoWithWeatherDescription
            location={location}
            goodPeriodsCount={goodPeriodsCount}
            percentageOfGoodPeriods={percentageOfGoodPeriods}
          />
        </Dialog>
      )}
      <CreateLocationPostDialog
        handleClose={handleCreatePostDialogClose}
        location_id={location_id}
        open={postDialogOpen}
        location_name={location_name}
      />
    </>
  )
}
