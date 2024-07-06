"use client"
import React, { useState, useEffect } from "react"
import ProfileMap from "@/components/ProfileMap"
import { KitesurfSpot, ViableDirections } from "@/app/api/mock"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import ProfileRenderingInfo from "@/components/ProfileRenderingInfo"
import { Checkbox, FormControlLabel, Slider } from "@mui/material"

const defaultViableDirections: ViableDirections = {
  N: 0,
  NE: 0,
  E: 0,
  SE: 0,
  S: 0,
  SW: 0,
  W: 0,
  NW: 0,
}

const Profile: React.FC = () => {
  const [locations, setLocations] = useState<KitesurfSpot[]>([])
  const [minWindspeed, setMinWindspeed] = useState<number>(0)
  const [viableDirections, setViableDirections] = useState<ViableDirections>(
    defaultViableDirections
  )
  const [selectedLocation, setSelectedLocation] = useState<KitesurfSpot | null>(
    null
  )
  const [open, setOpen] = useState<boolean>(false)

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
    setOpen(true)
  }

  const handleSaveLocation = (name: string) => {
    if (!name) return
    const newSpot: KitesurfSpot = {
      id: Date.now(),
      latitude: selectedLocation?.latitude || 0,
      longitude: selectedLocation?.longitude || 0,
      name,
      island: "",
      winddirections: "",
      waves: "",
      depth: "",
      description: "",
      experience: "",
      references: "",
      location_img_url: "",
      viable_directions: viableDirections,
      minWindspeed: minWindspeed,
    }
    setLocations((prevLocations) => [...prevLocations, newSpot])
    setOpen(false)
    setSelectedLocation(null)
  }

  const handleDeleteLocation = (id: number) => {
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location.id !== id)
    )
  }

  const handleViableDirectionChange = (direction: keyof ViableDirections) => {
    setViableDirections((prev) => ({
      ...prev,
      [direction]: prev[direction] ? 0 : 1,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">My Kitesurf Locations</h1>
      <div className="mb-4" style={{ height: "400px" }}>
        <ProfileMap
          locations={locations}
          onLocationAdd={handleAddLocation}
          onLocationDelete={handleDeleteLocation}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Saved Locations</h2>
        <FontAwesomeIcon
          icon={faPlus}
          className="text-green-500 cursor-pointer"
          onClick={() => setOpen(true)}
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
      <div>
        <label className="block text-lg font-bold mb-2" htmlFor="minWindspeed">
          Minimum Windspeed
        </label>
        <Slider
          value={minWindspeed}
          onChange={(e, value) => setMinWindspeed(value as number)}
          aria-labelledby="minWindspeed"
          min={0}
          max={100}
          valueLabelDisplay="auto"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Viable Wind Directions</h2>
        {Object.keys(defaultViableDirections).map((direction) => (
          <FormControlLabel
            key={direction}
            control={
              <Checkbox
                checked={
                  viableDirections[direction as keyof ViableDirections] === 1
                }
                onChange={() =>
                  handleViableDirectionChange(
                    direction as keyof ViableDirections
                  )
                }
                name={direction}
              />
            }
            label={direction}
          />
        ))}
      </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New Location</h2>
            <input
              type="text"
              placeholder="Enter location name"
              className="mb-4 p-2 border border-gray-300 rounded bg-gray-800 text-white w-full"
              onChange={(e) => setLocationName(e.target.value)}
            />
            <button
              onClick={() => handleSaveLocation(locationName)}
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

export default Profile
