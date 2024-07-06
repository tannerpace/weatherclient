"use client"
import React, { useState, useEffect } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import { KitesurfSpot } from "@/app/api/mock"

config.autoAddCss = false

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

const Profile: React.FC = () => {
  const [locations, setLocations] = useState<KitesurfSpot[]>([])
  const [newLocation, setNewLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [minWindspeed, setMinWindspeed] = useState<number | null>(null)

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
    if (newLocation) {
      const name = prompt("Enter a name for this location:")
      if (name) {
        const newSpot: KitesurfSpot = {
          id: Date.now(),
          latitude: newLocation.lat,
          longitude: newLocation.lng,
          name,
          island: "",
          winddirections: "",
          waves: "",
          depth: "",
          description: "",
          experience: "",
          references: "",
          location_img_url: "",
          viable_directions: {},
        }
        const updatedLocations = [...locations, newSpot]
        setLocations(updatedLocations)
        localStorage.setItem("userLocations", JSON.stringify(updatedLocations))
        setNewLocation(null)
      }
    }
  }, [newLocation, locations])

  const handleDelete = (id: number) => {
    const updatedLocations = locations.filter((location) => location.id !== id)
    setLocations(updatedLocations)
    localStorage.setItem("userLocations", JSON.stringify(updatedLocations))
  }

  const handleMinWindspeedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10)
    setMinWindspeed(value)
    localStorage.setItem("minWindspeed", JSON.stringify(value))
  }

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setNewLocation({ lat: e.latlng.lat, lng: e.latlng.lng })
      },
    })
    return null
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Kitesurf Locations</h1>
      <div className="map-container mb-4" style={{ height: "400px" }}>
        <MapContainer
          center={[32.7765, -79.9311]}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
            >
              <Popup>
                <div className="p-2">
                  <div className="font-bold">{location.name}</div>
                  <button
                    onClick={() => handleDelete(location.id)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
          <MapEvents />
        </MapContainer>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Saved Locations</h2>
        <button className="text-green-500 cursor-pointer">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <ul className="mt-4">
        {locations.map((location) => (
          <li key={location.id} className="mb-2 flex justify-between">
            <span>{location.name}</span>
            <button
              onClick={() => handleDelete(location.id)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
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
    </div>
  )
}

export default Profile
