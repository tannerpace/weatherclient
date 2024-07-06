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

import { SurfSpot } from "../types"

config.autoAddCss = false

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

const SurfProfile: React.FC = () => {
  const [surfSpots, setSurfSpots] = useState<SurfSpot[]>([])
  const [newLocation, setNewLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)

  useEffect(() => {
    const savedSurfSpots = JSON.parse(
      localStorage.getItem("userSurfSpots") || "[]"
    )
    setSurfSpots(savedSurfSpots)
  }, [])

  useEffect(() => {
    if (newLocation) {
      const name = prompt("Enter a name for this surf spot:")
      const description = prompt("Enter a description for this surf spot:")
      const waveHeight = prompt("Enter the wave height for this surf spot:")
      const windSpeed = prompt("Enter the wind speed for this surf spot:")
      if (name && description && waveHeight && windSpeed) {
        const newSpot: SurfSpot = {
          id: Date.now(),
          latitude: newLocation.lat,
          longitude: newLocation.lng,
          name,
          description,
          waveHeight,
          windSpeed,
        }
        const updatedSurfSpots = [...surfSpots, newSpot]
        setSurfSpots(updatedSurfSpots)
        localStorage.setItem("userSurfSpots", JSON.stringify(updatedSurfSpots))
        setNewLocation(null)
      }
    }
  }, [newLocation, surfSpots])

  const handleDelete = (id: number) => {
    const updatedSurfSpots = surfSpots.filter((spot) => spot.id !== id)
    setSurfSpots(updatedSurfSpots)
    localStorage.setItem("userSurfSpots", JSON.stringify(updatedSurfSpots))
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
      <h1 className="text-2xl font-bold mb-4">My Surf Spots</h1>
      <div className="map-container mb-4" style={{ height: "400px" }}>
        <MapContainer
          center={[32.7765, -79.9311]}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {surfSpots.map((spot) => (
            <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
              <Popup>
                <div className="p-2">
                  <div className="font-bold">{spot.name}</div>
                  <p>{spot.description}</p>
                  <p>Wave Height: {spot.waveHeight}</p>
                  <p>Wind Speed: {spot.windSpeed}</p>
                  <button
                    onClick={() => handleDelete(spot.id)}
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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Saved Surf Spots</h2>
        <FontAwesomeIcon
          icon={faPlus}
          className="text-green-500 cursor-pointer"
        />
      </div>
      <ul className="mt-4">
        {surfSpots.map((spot) => (
          <li key={spot.id} className="mb-2">
            {spot.name}
            <button
              onClick={() => handleDelete(spot.id)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SurfProfile
