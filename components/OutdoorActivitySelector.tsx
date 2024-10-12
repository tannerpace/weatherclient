import React, { useState, useEffect } from "react"
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Button,
  Popover,
  Box,
} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons"

const OutdoorActivitySelector: React.FC = () => {
  enum ActivityEnum {
    Kitesurfing = 1 << 0,
    Hiking = 1 << 1,
    Cycling = 1 << 2,
    Fishing = 1 << 3,
    HuntingDuck = 1 << 4,
    HuntingDeer = 1 << 5,
    HuntingTurkey = 1 << 6,
    Running = 1 << 7,
    Surfing = 1 << 8,
    FishingRedfish = 1 << 9,
    ShrimpingWithPoles = 1 << 10,
  }

  const activities = [
    { label: "Kitesurfing", value: ActivityEnum.Kitesurfing.toString() },
    { label: "Hiking", value: ActivityEnum.Hiking.toString() },
    { label: "Cycling", value: ActivityEnum.Cycling.toString() },
    { label: "Fishing", value: ActivityEnum.Fishing.toString() },
    { label: "Hunting - Duck", value: ActivityEnum.HuntingDuck.toString() },
    { label: "Hunting - Deer", value: ActivityEnum.HuntingDeer.toString() },
    { label: "Hunting - Turkey", value: ActivityEnum.HuntingTurkey.toString() },
    { label: "Running", value: ActivityEnum.Running.toString() },
    { label: "Surfing", value: ActivityEnum.Surfing.toString() },
    {
      label: "Fishing - Redfish",
      value: ActivityEnum.FishingRedfish.toString(),
    },
    {
      label: "Shrimping with Poles",
      value: ActivityEnum.ShrimpingWithPoles.toString(),
    },
  ]

  const decodeActivities = (bitmask: number): ActivityEnum[] => {
    return Object.values(ActivityEnum).filter(
      (activity) =>
        typeof activity === "number" && bitmask & (activity as number)
    ) as ActivityEnum[]
  }

  const encodeActivities = (activities: ActivityEnum[]): number => {
    return activities.reduce((bitmask, activity) => bitmask | activity, 0)
  }

  const [selectedActivities, setSelectedActivities] = useState<ActivityEnum[]>(
    []
  )

  useEffect(() => {
    const storedBitmask = localStorage.getItem("outdoorActivitiesBitmask")
    if (storedBitmask) {
      const bitmask = parseInt(storedBitmask, 10)
      setSelectedActivities(decodeActivities(bitmask))
    }
  }, [])

  useEffect(() => {
    const encodedBitmask = encodeActivities(selectedActivities)
    localStorage.setItem("outdoorActivitiesBitmask", encodedBitmask.toString())
  }, [selectedActivities])

  const toggleActivity = (activityValue: string) => {
    const activity = parseInt(activityValue) as ActivityEnum
    setSelectedActivities((prevActivities) =>
      prevActivities.includes(activity)
        ? prevActivities.filter((a) => a !== activity)
        : [...prevActivities, activity]
    )
  }

  const clearActivities = () => {
    setSelectedActivities([])
  }

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
      <Button
        startIcon={<FontAwesomeIcon icon={faFilter} />}
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: "16px" }}
      >
        Select Activities
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box padding={2} minWidth={300}>
          <FormControl fullWidth>
            <InputLabel id="activity-select-label">Activities</InputLabel>
            <Select
              labelId="activity-select-label"
              id="activity-select"
              multiple
              value={selectedActivities.map((activity) => activity.toString())}
              onChange={(event) => {
                const value = event.target.value as string[]
                const selectedActivityEnums = value.map(
                  (activityValue) => parseInt(activityValue) as ActivityEnum
                )
                setSelectedActivities(selectedActivityEnums)
              }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return "No activities selected"
                }
                return (selected as string[])
                  .map(
                    (value) =>
                      activities.find((activity) => activity.value === value)
                        ?.label
                  )
                  .join(", ")
              }}
            >
              {activities.map((activity) => (
                <MenuItem key={activity.value} value={activity.value}>
                  <Checkbox
                    checked={selectedActivities
                      .map((activity) => activity.toString())
                      .includes(activity.value)}
                  />
                  <ListItemText primary={activity.label} />
                </MenuItem>
              ))}
            </Select>
            <Box display="flex" justifyContent="flex-end" marginTop={2}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<FontAwesomeIcon icon={faTimes} />}
                onClick={clearActivities}
              >
                Clear
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Popover>
    </Box>
  )
}

export default OutdoorActivitySelector
