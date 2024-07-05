"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import useKiteSurfSpots from "./hooks/useKiteSurfSpots"
import { KitesurfSpot } from "./api/mock"
import { FilterProvider } from "./context/FilterContext"
import { RenderingInfo } from "@/components/RenderingInfo"

config.autoAddCss = false

const Map = dynamic(() => import("@/components/Map"), { ssr: false })

const lat = "32.78621094914123"
const long = "-79.9387649781444"
const center: [number, number] = [parseFloat(lat), parseFloat(long)]

const FilteredApp: React.FC = () => {
  const { data: kitesurfSpots, isLoading } = useKiteSurfSpots()

  return (
    <div className="flex flex-col h-screen p-6">
      <input
        type="text"
        placeholder="Search by name"
        className="mb-4 p-2 border border-gray-300 rounded"
        style={{
          maxHeight: "3rem",
        }}
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
  const [currentLat, setCurrentLat] = useState(lat)
  const [currentLong, setCurrentLong] = useState(long)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleButtonClick = () => {
    setLoading(true)
    setError(null)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLat(position.coords.latitude.toString())
          setCurrentLong(position.coords.longitude.toString())
          setLoading(false)
        },
        (error) => {
          setError("Error fetching weather data: " + error.message)
          setLoading(false)
        }
      )
    } else {
      setError("Geolocation is not supported by your browser")
      setLoading(false)
    }
  }

  return (
    <QueryClientProvider client={new QueryClient()}>
      <FilterProvider>
        <FilteredApp />
        <div className="prose prose-sm prose-invert max-w-none p-2">
          <div className="weather mt-4">
            <h2 className="text-lg font-bold">Current Weather in Charleston</h2>
            <button
              onClick={handleButtonClick}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Loading..." : "Update Weather to Current Location"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <RenderingInfo latitude={currentLat} longitude={currentLong} />
          </div>
        </div>
      </FilterProvider>
    </QueryClientProvider>
  )
}

Page.displayName = "Kite Surf Ninja"

export default Page
