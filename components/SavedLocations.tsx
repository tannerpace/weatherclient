"use client"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion" // Import Framer Motion
import SavedLocationsMap from "@/components/SavedLocationsMap"
import { Checkbox, FormControlLabel, Slider } from "@mui/material"
import ProfileRenderingInfo from "./ProfileRenderingInfo"

const defaultViableDirections = {
  N: 0,
  NE: 0,
  E: 0,
  SE: 0,
  S: 0,
  SW: 0,
  W: 0,
  NW: 0,
}

const SavedLocations: React.FC = () => {
  const [locations, setLocations] = useState([])
  const [minWindspeed, setMinWindspeed] = useState<number>(0)
  const [viableDirections, setViableDirections] = useState(
    defaultViableDirections
  )
  const [selectedLocation, setSelectedLocation] = useState(null)
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
    setSelectedLocation({ latitude: lat, longitude: lng })
    setOpen(true)
  }

  const handleSaveLocation = () => {
    if (!locationName) return
    const newSpot = {
      id: Date.now(),
      latitude: selectedLocation?.latitude || 0,
      longitude: selectedLocation?.longitude || 0,
      name: locationName,
      viable_directions: viableDirections,
      minWindspeed: minWindspeed,
    }
    setLocations((prevLocations) => [...prevLocations, newSpot])
    setOpen(false)
    setSelectedLocation(null)
    setLocationName("")
    setMinWindspeed(0)
    setViableDirections(defaultViableDirections)
  }

  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Animated title using Framer Motion */}
      <motion.h1
        className="text-xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Click on map to save a new location
      </motion.h1>

      <div className="mb-4" style={{ height: "400px" }}>
        <SavedLocationsMap
          locations={locations}
          onLocationAdd={handleAddLocation}
        />
      </div>
      <button
        onClick={() => router.push("/")}
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded flex items-center justify-center hover:bg-green-700 w-full md:w-auto"
      >
        Home
      </button>

      <ul className="mb-4">
        {locations.map((location) => (
          <li key={location.id} className="mb-2">
            {location.name}
            <button
              onClick={() =>
                setLocations((prev) =>
                  prev.filter((loc) => loc.id !== location.id)
                )
              }
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {selectedLocation && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">
            Weather Information for {selectedLocation.name}
          </h2>
          <ProfileRenderingInfo
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
            minWindspeed={selectedLocation.minWindspeed || 0}
            viableDirections={selectedLocation.viable_directions || {}}
          />
        </div>
      )}

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
              <label className="block text-lg font-bold mb-2">
                Minimum Windspeed
              </label>
              <Slider
                value={minWindspeed}
                onChange={(e, value) => setMinWindspeed(value as number)}
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Viable Wind Directions</h2>
              {Object.keys(defaultViableDirections).map((direction) => (
                <FormControlLabel
                  key={direction}
                  control={
                    <Checkbox
                      checked={viableDirections[direction] === 1}
                      onChange={() =>
                        setViableDirections((prev) => ({
                          ...prev,
                          [direction]: prev[direction] ? 0 : 1,
                        }))
                      }
                    />
                  }
                  label={direction}
                />
              ))}
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

export default SavedLocations
