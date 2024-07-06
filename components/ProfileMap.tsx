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
import { KitesurfSpot } from "@/app/api/mock"
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
  locations: KitesurfSpot[]
  onLocationAdd: (lat: number, lng: number) => void
  onLocationDelete: (id: number) => void
  onLocationSelect: (location: KitesurfSpot) => void
}

const ProfileMap: React.FC<MapProps> = ({
  locations,
  onLocationAdd,
  onLocationDelete,
  onLocationSelect,
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
      style={{ height: "100%", width: "100%", zIndex: 1 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          eventHandlers={{
            click: () => {
              onLocationSelect(location)
            },
          }}
        >
          <Popup>
            <div className="p-2">
              <div className="font-bold">{location.name}</div>
              <div>Min Windspeed: {location.minWindspeed} mph</div>
              <div>Viable Directions:</div>
              <ul>
                {Object.entries(location.viable_directions || {}).map(
                  ([direction, isViable]) =>
                    isViable === 1 && <li key={direction}>{direction}</li>
                )}
              </ul>
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

export default ProfileMap
