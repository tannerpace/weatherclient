// pages/surf-profile.tsx

"use client"

import React, { useState, useEffect } from "react"
import SurfProfileMap from "@/components/SurfProfileMap"
import { KitesurfSpot } from "@/app/api/mock"
import { Slider } from "@mui/material"

const SurfProfile: React.FC = () => {
  const [locations, setLocations] = useState<KitesurfSpot[]>([])
  const [maxWindspeed, setMaxWindspeed] = useState<number>(0)
  const [waveHeight, setWaveHeight] = useState<number>(0)
  const [selectedLocation, setSelectedLocation] = useState<KitesurfSpot | null>(
    null
  )
  const [open, setOpen] = useState<boolean>(false)
  const [locationName, setLocationName] = useState<string>("")

  useEffect(() => {
    const savedLocations = JSON.parse(
      localStorage.getItem("userLocations") || "[]"
    )
    setLocations(savedLocations)
  }, [])

  useEffect(() => {
    localStorage.setItem("userLocations", JSON.stringify(locations))
  }, [locations])

  const handleAddLocation = (lat: number, lng: number) => {
    setSelectedLocation({
      id: Date.now(),
      latitude: lat,
      longitude: lng,
      name: "",
      island: "",
      winddirections: "",
      waves: "",
      depth: "",
      description: "",
      experience: "",
      references: "",
      location_img_url: "",
      viable_directions: {},
      minWindspeed: 0,
      maxWindspeed: 0,
      waveHeight: 0,
    })
    setOpen(true)
  }

  const handleSaveLocation = () => {
    if (!locationName || !selectedLocation) return
    const newSpot = {
      ...selectedLocation,
      name: locationName,
      maxWindspeed,
      waveHeight,
    }
    setLocations((prevLocations) => [...prevLocations, newSpot])
    setOpen(false)
    setSelectedLocation(null)
    setLocationName("")
    setMaxWindspeed(0)
    setWaveHeight(0)
  }

  const handleDeleteLocation = (id: number) => {
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location.id !== id)
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Surf Profile</h1>
      <div className="mb-4" style={{ height: "400px" }}>
        <SurfProfileMap
          locations={locations}
          onLocationAdd={handleAddLocation}
          onLocationDelete={handleDeleteLocation}
        />
      </div>
      <ul className="mb-4">
        {locations.map((location) => (
          <li key={location.id} className="mb-2">
            {location.name}
            <button
              onClick={() => handleDeleteLocation(location.id)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Add New Location</h2>
            <input
              type="text"
              placeholder="Enter location name"
              className="mb-4 p-2 border border-gray-300 rounded bg-gray-800 text-white w-full"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
            <div className="mb-4">
              <label
                className="block text-lg font-bold mb-2"
                htmlFor="maxWindspeed"
              >
                Max Windspeed
              </label>
              <Slider
                value={maxWindspeed}
                onChange={(e, value) => setMaxWindspeed(value as number)}
                aria-labelledby="maxWindspeed"
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-lg font-bold mb-2"
                htmlFor="waveHeight"
              >
                Wave Height
              </label>
              <Slider
                value={waveHeight}
                onChange={(e, value) => setWaveHeight(value as number)}
                aria-labelledby="waveHeight"
                min={0}
                max={30}
                valueLabelDisplay="auto"
              />
            </div>
            <button
              onClick={handleSaveLocation}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
            >
              Save
            </button>
            <button
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SurfProfile
