"use client"
import React, { useState, useEffect } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FilterProvider } from "./context/FilterContext"
import { RenderingInfo } from "@/components/RenderingInfo"
import { lat, long, initialCenter, FilteredApp } from "./page"

export const Page: React.FC = () => {
  const [currentLat, setCurrentLat] = useState(lat)
  const [currentLong, setCurrentLong] = useState(long)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [center, setCenter] = useState<[number, number]>(initialCenter)

  const handleButtonClick = () => {
    setLoading(true)
    setError(null)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude.toString()
          const newLong = position.coords.longitude.toString()
          setCurrentLat(newLat)
          setCurrentLong(newLong)
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
    const coords = `Latitude: ${currentLat}, Longitude: ${currentLong}`
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
    setCenter([parseFloat(currentLat), parseFloat(currentLong)])
  }, [currentLat, currentLong])

  const title =
    lat === currentLat
      ? "Current Weather in Charleston, SC"
      : "Weather Update for Your Location"

  return (
    <QueryClientProvider client={new QueryClient()}>
      <FilterProvider>
        <FilteredApp center={center} />
        <div className="space-y-3 rounded-lg bg-gray-900 p-3 m-10">
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
                <strong>Latitude:</strong> {currentLat}
              </p>
              <p>
                <strong>Longitude:</strong> {currentLong}
              </p>
              <button
                onClick={handleCopyToClipboard}
                className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Copy Coordinates to Clipboard
              </button>
            </div>
            <RenderingInfo latitude={currentLat} longitude={currentLong} />
            <p className="mt-4 text-md text-gray-500">
              {currentLat === lat && currentLong === long
                ? "Showing weather for Charleston, SC"
                : "Showing weather for your current location"}
            </p>
          </div>
        </div>
      </FilterProvider>
    </QueryClientProvider>
  )
}
