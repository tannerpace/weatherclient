"use client"
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
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import BottomNavigationBar from "@/components/BottomNavBar"

config.autoAddCss = false

const Map = dynamic(() => import("@/components/Map"), { ssr: false })

const FilteredApp: React.FC<{
  center: [number, number]
}> = ({ center }) => {
  const { data: kitesurfSpots, isLoading } = useKiteSurfSpots()

  return (
    <div className="flex flex-col h-full mb-50">
      {!isLoading && (
        <Map
          position={center}
          kitesurfSpots={kitesurfSpots as KitesurfSpot[]}
        />
      )}
      <BottomNavigationBar />
    </div>
  )
}

const Page: React.FC = () => {
  const { latitude, longitude, setCoordinates } = useFilterContext()
  const { showModal, setShowModal } = useSelectedLocationContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [center, setCenter] = useState<[number, number]>([
    parseFloat(latitude),
    parseFloat(longitude),
  ])
  const [locationName, setLocationName] = useState<string>("")

  const handleButtonClick = () => {
    setLoading(true)
    setError(null)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude.toString()
          const newLong = position.coords.longitude.toString()
          setCoordinates(newLat, newLong)
          setCenter([parseFloat(newLat), parseFloat(newLong)])
          setLoading(false)
        },
        (error) => {
          setError("Error fetching location data: " + error.message)
          setLoading(false)
        }
      )
    } else {
      setError("Geolocation is not supported by your browser")
      setLoading(false)
    }
  }

  const handleNavigateToUserLocation = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    window.open(url, "_blank")
  }

  useEffect(() => {
    if (latitude === DEFAULT_LATITUDE && longitude === DEFAULT_LONGITUDE) {
      setLocationName("Charleston")
    } else {
      // fetchLocationName(latitude, longitude)
    }
    setCenter([parseFloat(latitude), parseFloat(longitude)])
  }, [latitude, longitude])

  const title =
    center[0] === parseFloat(DEFAULT_LATITUDE) &&
    center[1] === parseFloat(DEFAULT_LONGITUDE)
      ? "Location: Charleston"
      : `Showing Weather for : ${latitude}, ${longitude}`

  const handleCloseModal = () => setShowModal(false)
  const router = useRouter()

  return (
    <>
      <FilteredApp center={center} />
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
