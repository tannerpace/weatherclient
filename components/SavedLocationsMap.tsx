"use client"
import React, { useState } from "react"
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

// Assuming you have a basic modal component, but you can use any modal library (e.g., Material UI, Bootstrap, etc.)
const Modal: React.FC<{
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Location</h2>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

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

const SavedLocationsMap: React.FC<MapProps> = ({
  locations,
  onLocationAdd,
  onLocationDelete,
  onLocationSelect,
}) => {
  const [modalOpen, setModalOpen] = useState(false) // State to manage modal visibility
  const [draftLocation, setDraftLocation] = useState<[number, number] | null>(
    null
  )

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setDraftLocation([e.latlng.lat, e.latlng.lng])
        setModalOpen(true) // Open modal when a location is selected
      },
    })
    return null
  }

  const handlePasteClipboardLocation = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      const [lat, lng] = clipboardText.split(",").map(Number)

      if (!isNaN(lat) && !isNaN(lng)) {
        setDraftLocation([lat, lng])
        setModalOpen(true) // Open modal when location is pasted
      } else {
        alert(
          "Invalid coordinates in clipboard. Please copy in 'lat,lng' format."
        )
      }
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error)
    }
  }

  const confirmLocation = () => {
    if (draftLocation) {
      onLocationAdd(draftLocation[0], draftLocation[1])
      setDraftLocation(null) // Clear draft location
    }
    setModalOpen(false) // Close modal
  }

  const closeModal = () => {
    setDraftLocation(null) // Discard draft location
    setModalOpen(false) // Close modal
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{ padding: "10px" }}>
        <button
          onClick={handlePasteClipboardLocation}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add Location from Clipboard
        </button>
      </div>

      {/* Map Container */}
      <MapContainer
        center={[32.7765, -79.9311]}
        zoom={10}
        style={{ height: "500px", width: "100%", zIndex: 1 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Render existing locations */}
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

        {/* Render draft marker if available */}
        {draftLocation && (
          <Marker position={draftLocation}>
            <Popup>
              New Location: {draftLocation[0]}, {draftLocation[1]}
            </Popup>
          </Marker>
        )}

        <MapEvents />
      </MapContainer>

      {/* Modal for confirming location */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={confirmLocation}
      />
    </div>
  )
}

export default SavedLocationsMap
