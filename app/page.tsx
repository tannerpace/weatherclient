"use client"
import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"

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
    <div className="flex flex-col h-screen p-6">
      <input
        type="text"
        placeholder="Search by name"
        className="mb-4 p-2 border border-gray-300 rounded"
        style={{ maxHeight: "3rem" }}
      />
      <div className="w-full p-4 h-full">
        {!isLoading && (
          <Map
            position={center}
            kitesurfSpots={kitesurfSpots as KitesurfSpot[]}
          />
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

  useEffect(() => {
    setCenter([parseFloat(latitude), parseFloat(longitude)])
  }, [latitude, longitude])

  const title =
    latitude === "32.78621094914123" && longitude === "-79.9387649781444"
      ? "Current Weather in Charleston, SC"
      : "Weather Update for Your Location"

  return (
    <div className="space-y-3 rounded-lg bg-gray-900 p-3 m-10">
      <FilteredApp center={center} />
      <div className="text-sm text-gray-300">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          onClick={handleButtonClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update to Current Location"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-4">
          <p>
            <strong>Latitude:</strong> {latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {longitude}
          </p>
          <button
            onClick={handleCopyToClipboard}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Copy Coordinates to Clipboard
          </button>
        </div>
        <RenderingInfo latitude={latitude} longitude={longitude} />
        <p className="mt-4 text-md text-gray-500">
          {latitude === "32.78621094914123" && longitude === "-79.9387649781444"
            ? "Showing weather for Charleston, SC"
            : "Showing weather for your current location"}
        </p>
      </div>
    </div>
  )
}

const AppPage: React.FC = () => {
  return (
    <ClientProviders>
      <Page />
    </ClientProviders>
  )
}

AppPage.displayName = "Kite Surf Ninja"

export default AppPage
