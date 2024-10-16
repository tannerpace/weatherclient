"use client"
import Tooltip from "@mui/material/Tooltip"
import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { ActivitySpot } from "@/app/api/mock"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import ClientProviders from "./context/ClientProviders"
import { useKiteSurfSpots } from "./hooks/useKiteSurfSpots"
import {
  useFilterContext,
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
} from "./context/FilterContext"
import LocationModal from "@/components/LocationModal"
import { useSelectedLocationContext } from "@/app/context/SelectedLocationContext"
import BottomNavigationBar from "@/components/BottomNavBar"
import { useWeatherContext } from "@/app/context/WeatherContext"
import CircularProgress from "@mui/material/CircularProgress"
import MyLocationIcon from "@mui/icons-material/MyLocation"
import Search from "@/components/Search"
import { LatLngLiteral } from "leaflet"
import OutdoorActivitySelector from "@/components/OutdoorActivitySelector"
import ActivityEnum from "./enums/ActivityEnum"

config.autoAddCss = false

const Map = dynamic(() => import("@/components/Map"), { ssr: false })

const FilteredApp: React.FC<{
  center: [number, number]
  userLocation: [number, number] | null
}> = ({ center, userLocation }) => {
  const { data: kitesurfSpots, isLoading } = useKiteSurfSpots()
  const [filteredSpots, setFilteredSpots] = useState<ActivitySpot[]>([])

  useEffect(() => {
    if (kitesurfSpots) {
      setFilteredSpots(kitesurfSpots)
    }
  }, [kitesurfSpots])

  const handleSearch = (searchTerm: React.SetStateAction<string>) => {
    setFilteredSpots(
      kitesurfSpots?.filter((kiteSpot) =>
        kiteSpot.name
          .toLowerCase()
          .includes((searchTerm as string).toLowerCase())
      ) as ActivitySpot[]
    )
  }

  const handleActivityFilter = (activities: ActivityEnum[]) => {
    if (kitesurfSpots) {
      if (activities.length === 0) {
        setFilteredSpots(kitesurfSpots)
      } else {
        setFilteredSpots(
          kitesurfSpots.filter((spot) =>
            activities.includes(spot.activity as ActivityEnum)
          )
        )
      }
    }
  }

  return (
    <div className="relative h-screen w-full bg-gradient-to-b from-blue-100 to-blue-900">
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-col lg:flex-row lg:justify-between items-center space-y-4 lg:space-y-0 bg-gradient-to-b from-white/0 via-white/20 to-white/1 backdrop-blur-xl p-4 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out">
        <div className="w-full lg:w-1/2">
          <Search onSearch={handleSearch} />
        </div>
        <div className="w-full lg:w-1/3">
          <OutdoorActivitySelector onActivityFilter={handleActivityFilter} />
        </div>
      </div>

      {!isLoading && (
        <Map
          userLocation={userLocation as unknown as LatLngLiteral}
          center={center}
          kitesurfSpots={filteredSpots || (kitesurfSpots as ActivitySpot[])}
        />
      )}
      <BottomNavigationBar />
    </div>
  )
}

const Page: React.FC = () => {
  const { latitude, longitude, setCoordinates } = useFilterContext()
  const { showModal, setShowModal } = useSelectedLocationContext()
  const { setLocation } = useWeatherContext()
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  )
  const [center, setCenter] = useState<[number, number]>([
    parseFloat(latitude),
    parseFloat(longitude),
  ])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleGeolocationClick = () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude.toString()
          const newLong = position.coords.longitude.toString()
          setCoordinates(newLat, newLong)
          setUserLocation([parseFloat(newLat), parseFloat(newLong)])
          setCenter([parseFloat(newLat), parseFloat(newLong)])
          setLocation(newLat, newLong)
          setError(null)
          setLoading(false)
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setError(
              "Location access denied. Please enable location services in your browser settings."
            )
            alert(
              "Location access denied.\n\nTo enable location access in Chrome:\n1. Click on the padlock icon in the address bar.\n2. Select 'Site settings'.\n3. Find 'Location' and set it to 'Allow'.\n4. Refresh the page and try again."
            )
          } else {
            setError("Error fetching location data: " + error.message)
          }
          setLoading(false)
        }
      )
    } else {
      setError("Geolocation is not supported by your browser")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (latitude === DEFAULT_LATITUDE && longitude === DEFAULT_LONGITUDE) {
      setCenter([parseFloat(DEFAULT_LATITUDE), parseFloat(DEFAULT_LONGITUDE)])
    } else {
      setCenter([parseFloat(latitude), parseFloat(longitude)])
    }
  }, [latitude, longitude])

  const handleCloseModal = () => setShowModal(false)

  return (
    <>
      <Tooltip title="Show my location">
        <button
          onClick={handleGeolocationClick}
          className="absolute top-40 right-6 z-10 bg-white p-3 rounded-full shadow-xl flex items-center justify-center hover:bg-gray-100 transition-all duration-300 ease-in-out disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={20} className="mr-2 text-black" />
          ) : (
            <MyLocationIcon className="text-black" />
          )}
        </button>
      </Tooltip>

      {error && (
        <div className="absolute top-16 left-4 z-10 text-red-500 bg-white p-4 rounded-xl shadow-md">
          {error}
        </div>
      )}
      <FilteredApp center={center} userLocation={userLocation} />
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <LocationModal onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  )
}

const AppPage: React.FC = () => {
  return (
    <ClientProviders>
      <Page />
    </ClientProviders>
  )
}

AppPage.displayName = "Windy Sessions"

export default AppPage
