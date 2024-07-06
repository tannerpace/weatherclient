"use client"

import React from "react"
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
import { faTrash } from "@fortawesome/free-solid-svg-icons"

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface MapProps {
  locations: SurfSpot[]
  onLocationAdd: (lat: number, lng: number) => void
  onLocationDelete: (id: number) => void
}

const SurfProfileMap: React.FC<MapProps> = ({
  locations,
  onLocationAdd,
  onLocationDelete,
}) => {
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        onLocationAdd(e.latlng.lat, e.latlng.lng)
      },
    })
    return null
  }

  return (
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
              <div className="text-sm">
                <p>
                  <strong>Max Windspeed:</strong> {location.windSpeed} mph
                </p>
                <p>
                  <strong>Wave Height:</strong> {location.waveHeight} ft
                </p>
              </div>
              <button
                onClick={() => onLocationDelete(location.id)}
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
  )
}

export default SurfProfileMap
