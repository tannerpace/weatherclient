"use client"
import { ViableDirections } from "@/app/api/mock"
import { Checkbox, FormControlLabel, Slider } from "@mui/material"
import { useEffect, useState } from "react"
import SurfProfileMap from "./SurfProfileMap"
import ProfileRenderingInfo from "./ProfileRenderingInfo"

export interface SurfSpot {
  id: number
  latitude: number
  longitude: number
  name: string
  minWindSpeed?: number
  maxWindspeed?: number
  waveHeight: number
  viable_directions: ViableDirections
}

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

const SurfProfile: React.FC = () => {
  const [locations, setLocations] = useState<SurfSpot[]>([])
  const [minWindspeed, setMinWindspeed] = useState<number>(0)
  const [maxWindspeed, setMaxWindspeed] = useState<number>(0)
  const [waveHeight, setWaveHeight] = useState<number>(0)
  const [viableDirections, setViableDirections] = useState<ViableDirections>(
    defaultViableDirections
  )
  const [selectedLocation, setSelectedLocation] = useState<SurfSpot | null>(
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
      maxWindspeed: 0,
      waveHeight: 0,
      viable_directions: defaultViableDirections,
    })
    setOpen(true)
  }

  const handleSaveLocation = () => {
    if (!locationName) return
    const newSpot: SurfSpot = {
      id: Date.now(),
      latitude: selectedLocation?.latitude || 0,
      longitude: selectedLocation?.longitude || 0,
      name: locationName,
      maxWindspeed: maxWindspeed,
      waveHeight: waveHeight,
      viable_directions: viableDirections,
    }
    setLocations((prevLocations) => [...prevLocations, newSpot])
    setOpen(false)
    setSelectedLocation(null)
    setLocationName("")
    setMinWindspeed(0)
    setMaxWindspeed(0)
    setWaveHeight(0)
    setViableDirections(defaultViableDirections)
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
        <SurfProfileMap
          locations={locations}
          onLocationAdd={handleAddLocation}
          onLocationDelete={handleDeleteLocation}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Saved Locations</h2>
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
      {selectedLocation && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">
            Weather Information for {selectedLocation.name}
          </h2>
          <ProfileRenderingInfo
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
            minWindspeed={selectedLocation.minWindSpeed || 0}
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
              <label
                className="block text-lg font-bold mb-2"
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
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-lg font-bold mb-2"
                htmlFor="maxWindspeed"
              >
                Maximum Windspeed
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
                max={10}
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

export default SurfProfile
