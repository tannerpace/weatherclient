"use client"
import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLocationArrow,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons"
import RenderingInfo from "@/components/RenderingInfo"
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

config.autoAddCss = false

const Map = dynamic(() => import("@/components/Map"), { ssr: false })

const FilteredApp: React.FC<{
  center: [number, number]
}> = ({ center }) => {
  const { data: kitesurfSpots, isLoading } = useKiteSurfSpots()

  return (
    <div className="flex flex-col h-full">
      <input
        type="text"
        placeholder="Search by name"
        className="mb-4 p-2 border border-gray-300 rounded bg-gray-800 text-white max-h-12"
      />
      <div className="w-full flex-grow p-4 bg-gray-800 rounded-lg">
        {!isLoading && (
          <div className="h-96 md:h-[600px] w-full">
            <Map
              position={center}
              kitesurfSpots={kitesurfSpots as KitesurfSpot[]}
            />
          </div>
        )}
      </div>
    </div>
  )
}

const Page: React.FC = () => {
  const { latitude, longitude, setCoordinates } = useFilterContext()
  const { selectedLocation, showModal, setShowModal } =
    useSelectedLocationContext()
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
          fetchLocationName(newLat, newLong)
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

  const fetchLocationName = async (lat: string, lon: string) => {
    try {
      const benchmark = "Public_AR_Current"
      const response = await axios.get(
        `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${lat},${lon}&benchmark=${benchmark}&format=json`
      )
      const location = response.data.result.addressMatches[0].matchedAddress
      setLocationName(location)
    } catch (error) {
      console.error("Error fetching location name: ", error)
    }
  }

  useEffect(() => {
    if (latitude === DEFAULT_LATITUDE && longitude === DEFAULT_LONGITUDE) {
      setLocationName("Charleston")
    } else {
      fetchLocationName(latitude, longitude)
    }
    setCenter([parseFloat(latitude), parseFloat(longitude)])
  }, [latitude, longitude])

  const title =
    center[0] === parseFloat(DEFAULT_LATITUDE) &&
    center[1] === parseFloat(DEFAULT_LONGITUDE)
      ? "Location: Charleston"
      : `Showing Weather for : ${latitude}, ${longitude}`

  const handleCloseModal = () => setShowModal(false)

  return (
    <div className="flex flex-col items-center space-y-6 p-4 md:p-8 bg-gray-900 text-white rounded-lg h-screen relative">
      <div className="w-full max-w-5xl space-y-6 bg-gray-900 text-white rounded-lg">
        <FilteredApp center={center} />
      </div>
      <div className="w-full max-w-3xl space-y-4">
        <h2 className="text-lg font-bold text-center md:text-left">{title}</h2>
        <button
          onClick={handleButtonClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-700 w-full md:w-auto"
          disabled={loading}
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={faLocationArrow} className="mr-2" />
              Loading...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faLocationArrow} className="mr-2" />
              Update to Current Location
            </>
          )}
        </button>
        {error && (
          <p className="text-red-500 mt-2">
            <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
            {error}
          </p>
        )}
        <RenderingInfo
          latitude={Number(latitude)}
          longitude={Number(longitude)}
        />
        <p className="mt-4 text-md text-gray-500 text-center md:text-left">
          {locationName
            ? `Showing weather for ${locationName}`
            : "Showing weather for your current location"}
        </p>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <LocationModal onClose={handleCloseModal} />
        </div>
      )}
    </div>
  )
}

const AppPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 overflow-scroll">
      <ClientProviders>
        <Page />
      </ClientProviders>
    </div>
  )
}

AppPage.displayName = "Kite Surf Ninja"

export default AppPage
