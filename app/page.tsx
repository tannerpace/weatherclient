"use client"
import Tooltip from "@mui/material/Tooltip"
import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { KitesurfSpot } from "@/app/api/mock"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import ClientProviders from "./context/ClientProviders"
import useKiteSurfSpots from "./hooks/useKiteSurfSpots"
import {
  useFilterContext,
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
} from "./context/FilterContext"
import LocationModal from "@/components/LocationModal"
import { useSelectedLocationContext } from "@/app/context/SelectedLocationContext"
import BottomNavigationBar from "@/components/BottomNavBar"
import { useWeatherContext } from "@/app/context/WeatherContext"
import CircularProgress from "@mui/material/CircularProgress" // Import CircularProgress
import { MapsUgc, MapsUgcOutlined } from "@mui/icons-material"
import MyLocationIcon from "@mui/icons-material/MyLocation"
import Search from "@/components/Search"

config.autoAddCss = false

const Map = dynamic(() => import("@/components/Map"), { ssr: false })
export interface FilteredAppProps {
  center: [number, number]
  userLocation: [number, number] | null
}

const FilteredApp: React.FC<FilteredAppProps> = ({ center, userLocation }) => {
  const { data: kitesurfSpots, isLoading } = useKiteSurfSpots()
  const [filteredSpots, setFilteredSpots] = useState<KitesurfSpot[]>([])

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
      ) as KitesurfSpot[]
    )
  }

  return (
    <div className="flex flex-col h-full mb-50">
      <Search onSearch={handleSearch} />
      {!isLoading && (
        <Map
          userLocation={
            userLocation as unknown as Pick<FilteredAppProps, "userLocation">
          }
          center={center}
          kitesurfSpots={filteredSpots || (kitesurfSpots as KitesurfSpot[])}
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
          setLoading(false) // Set loading to false
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
          setLoading(false) // Set loading to false
        }
      )
    } else {
      setError("Geolocation is not supported by your browser")
      setLoading(false) // Set loading to false
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
      <Tooltip title="Center On Me">
        <button
          onClick={handleGeolocationClick}
          className="absolute top-34 right-4 z-10 bg-white p-2 mt-6 rounded shadow flex items-center text-black"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <CircularProgress size={20} className="mr-2 text-white" />
          ) : (
            <MyLocationIcon />
          )}
        </button>
      </Tooltip>

      {error && (
        <div className="absolute top-16 left-4 z-10 text-red-500">{error}</div>
      )}
      <FilteredApp center={center} userLocation={userLocation} />
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <LocationModal onClose={handleCloseModal} />
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
