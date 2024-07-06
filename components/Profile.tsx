"use client"

import React, { useState, useEffect } from "react"
import ProfileMap from "@/components/ProfileMap"
import { KitesurfSpot } from "@/app/api/mock"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import RenderingInfo from "@/components/RenderingInfo"

const Profile: React.FC = () => {
  const [locations, setLocations] = useState<KitesurfSpot[]>([])
  const [minWindspeed, setMinWindspeed] = useState<number | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<KitesurfSpot | null>(
    null
  )

  useEffect(() => {
    const savedLocations = JSON.parse(
      localStorage.getItem("userLocations") || "[]"
    )
    const savedMinWindspeed = JSON.parse(
      localStorage.getItem("minWindspeed") || "null"
    )
    setLocations(savedLocations)
    if (savedMinWindspeed !== null) {
      setMinWindspeed(savedMinWindspeed)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("userLocations", JSON.stringify(locations))
  }, [locations])

  const handleAddLocation = (lat: number, lng: number) => {
    const name = prompt("Enter a name for this location:")
    if (name) {
      const newSpot: KitesurfSpot = {
        id: Date.now(),
        latitude: lat,
        longitude: lng,
        name,
        island: "",
        winddirections: "",
        waves: "",
        depth: "",
        description: "",
        experience: "",
        references: "",
        location_img_url: "",
        viable_directions: {
          N: false,
          NE: false,
          E: false,
          SE: false,
          S: false,
          SW: false,
          W: false,
          NW: false,
        },
      }
      setLocations((prevLocations) => [...prevLocations, newSpot])
    }
  }

  const handleDeleteLocation = (id: number) => {
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location.id !== id)
    )
  }

  const handleMinWindspeedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10)
    setMinWindspeed(value)
    localStorage.setItem("minWindspeed", JSON.stringify(value))
  }

  const handleLocationSelect = (location: KitesurfSpot) => {
    setSelectedLocation(location)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">My Kitesurf Locations</h1>
      <div className="mb-4" style={{ height: "400px" }}>
        <ProfileMap
          locations={locations}
          onLocationAdd={handleAddLocation}
          onLocationDelete={handleDeleteLocation}
          onLocationSelect={handleLocationSelect}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Saved Locations</h2>
        <FontAwesomeIcon
          icon={faPlus}
          className="text-green-500 cursor-pointer"
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
        <input
          type="number"
          id="minWindspeed"
          value={minWindspeed ?? ""}
          onChange={handleMinWindspeedChange}
          className="p-2 border border-gray-300 rounded bg-gray-800 text-white w-full"
        />
      </div>
      {selectedLocation && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">
            Weather Information for {selectedLocation.name}
          </h2>
          <RenderingInfo
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
          />
        </div>
      )}
    </div>
  )
}

export default Profile
