"use client"
import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import axios from "axios"
import RenderingInfo from "@/components/RenderingInfo"
import { KitesurfSpot } from "@/app/api/mock"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import ClientProviders from "./context/ClientProviders"
import useKiteSurfSpots from "./hooks/useKiteSurfSpots"
import { useFilterContext } from "./context/FilterContext"

config.autoAddCss = false

const Map = dynamic(() => import("@/components/Map"), { ssr: false })

const FilteredApp: React.FC<{ center: [number, number] }> = ({ center }) => {
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

  const handleCopyToClipboard = () => {
    const coords = `Latitude: ${latitude}, Longitude: ${longitude}`
    navigator.clipboard.writeText(coords).then(
      () => {
        console.log("Coordinates copied to clipboard!")
      },
      (err) => {
        console.error("Failed to copy coordinates: ", err)
      }
    )
  }

  const fetchLocationName = async (lat: string, lon: string) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=YOUR_API_KEY`
      )
      const location = response.data.results[0].formatted
      setLocationName(location)
    } catch (error) {
      console.error("Error fetching location name: ", error)
    }
  }

  useEffect(() => {
    setCenter([parseFloat(latitude), parseFloat(longitude)])
    fetchLocationName(latitude, longitude)
  }, [latitude, longitude])

  const title = locationName
    ? `Weather Update for ${locationName}`
    : "Weather Update for Your Location"

  return (
    <div className="flex flex-col items-center space-y-6 p-4 md:p-8 bg-gray-900 text-white rounded-lg h-screen">
      <div className="w-full max-w-5xl space-y-6 bg-gray-900 text-white rounded-lg">
        <FilteredApp center={center} />
      </div>
      <div className="w-full max-w-3xl space-y-4">
        <h2 className="text-lg font-bold text-center md:text-left">{title}</h2>
        <button
          onClick={handleButtonClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full md:w-auto"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update to Current Location"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-4 text-center md:text-left">
          <p>
            <strong>Latitude:</strong> {latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {longitude}
          </p>
          <button
            onClick={handleCopyToClipboard}
            className="mt-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500 w-full md:w-auto"
          >
            Copy Coordinates to Clipboard
          </button>
        </div>
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
