"use client"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"
import SavedLocationsMap from "@/components/SavedLocationsMap"
import { ActivitySpot, ViableDirections } from "@/app/api/mock"
import { Checkbox, FormControlLabel, Slider } from "@mui/material"
import WeatherInfo from "./ProfileRenderingInfo"
import ActivityEnum from "@/app/enums/ActivityEnum"

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

const SavedLocations: React.FC = () => {
  const [locations, setLocations] = useState<ActivitySpot[]>([])
  const [minWindspeed, setMinWindspeed] = useState<number>(0)
  const [viableDirections, setViableDirections] = useState<ViableDirections>(
    defaultViableDirections
  )
  const [selectedLocation, setSelectedLocation] = useState<ActivitySpot | null>(
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
      ...selectedLocation,
      latitude: lat,
      longitude: lng,
    } as ActivitySpot)
    setOpen(true)
  }

  const handleSaveLocation = () => {
    if (!locationName) return
    const newSpot: ActivitySpot = {
      id: Date.now(),
      latitude: selectedLocation?.latitude || 0,
      longitude: selectedLocation?.longitude || 0,
      name: locationName,
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
      activity: ActivityEnum.Kitesurfing,
    }
    setLocations((prevLocations) => [...prevLocations, newSpot])
    setOpen(false)
    setSelectedLocation(null)
    setLocationName("")
    setMinWindspeed(0)
    setViableDirections(defaultViableDirections)
  }

  const router = useRouter()

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

  const handleLocationSelect = (location: ActivitySpot) => {
    setSelectedLocation(location)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Your Saved Locations</h1>
      <div className="mb-6 h-80">
        <SavedLocationsMap
          locations={locations}
          onLocationAdd={handleAddLocation}
          onLocationDelete={handleDeleteLocation}
          onLocationSelect={handleLocationSelect}
        />
      </div>
      <button
        onClick={() => router.push("/")}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300 w-full md:w-auto"
      >
        Go to Home
      </button>
      <ul className="mt-6">
        {locations.map((location) => (
          <li
            key={location.id}
            className="mb-4 flex justify-between items-center"
          >
            <span>{location.name}</span>
            <button
              onClick={() => handleDeleteLocation(location.id)}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {selectedLocation && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">
            Weather Info for {selectedLocation.name}
          </h2>
          <WeatherInfo
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
            minWindspeed={selectedLocation.minWindspeed || 0}
            viableDirections={selectedLocation.viable_directions || {}}
          />
        </div>
      )}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 modal">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Location</h2>
            <input
              type="text"
              placeholder="Enter location name"
              className="w-full mb-4 p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="minWindspeed"
              >
                Minimum Windspeed
              </label>
              <Slider
                value={minWindspeed}
                onChange={(e, value) => setMinWindspeed(value as number)}
                aria-labelledby="minWindspeed"
                min={0}
                max={100}
                valueLabelDisplay="auto"
                className="text-blue-500"
              />
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">
                Viable Wind Directions
              </h3>
              <div className="grid grid-cols-2 gap-2 modal">
                {Object.keys(defaultViableDirections).map((direction) => (
                  <FormControlLabel
                    key={direction}
                    control={
                      <Checkbox
                        checked={
                          viableDirections[
                            direction as keyof ViableDirections
                          ] === 1
                        }
                        onChange={() =>
                          handleViableDirectionChange(
                            direction as keyof ViableDirections
                          )
                        }
                        name={direction}
                        className="text-blue-500"
                      />
                    }
                    label={direction}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleSaveLocation}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Save Location
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-full mt-2 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
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
