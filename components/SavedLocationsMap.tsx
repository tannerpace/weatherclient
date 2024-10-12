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

import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboard } from "@fortawesome/free-solid-svg-icons"
import { ActivitySpot } from "@/app/api/mock"
import ActivityEnum from "@/app/enums/ActivityEnum"

// Default Leaflet icon options
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface MapProps {
  locations: ActivitySpot[] | null
  onLocationAdd: (lat: number, lng: number, activity: string) => void
  onLocationDelete: (id: number) => void
  onLocationSelect: (location: ActivitySpot) => void
}

const Modal: React.FC<{
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  location: Partial<ActivitySpot> | null
}> = ({ isOpen, onClose, onConfirm, location }) => {
  const handleCopyToClipboard = () => {
    if (location !== null) {
      const textToCopy = `${location.latitude}, ${location.longitude}`
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          alert("Coordinates copied to clipboard!")
        },
        (err) => {
          console.error("Could not copy text: ", err)
        }
      )
    }
  }

  if (!isOpen || !location) return null

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-content bg-gray-900 text-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">
          Confirm Location
        </h2>
        <div className="flex justify-between items-center gap-4 mb-4">
          <div className="text-sm">
            <p className="digital-clock font-mono text-green-400">
              Latitude: {location.latitude}
            </p>
            <p className="digital-clock font-mono text-green-400">
              Longitude: {location.longitude}
            </p>
            <p className="digital-clock font-mono text-green-400">
              Activity: {location.activity}
            </p>
          </div>
          <button
            onClick={handleCopyToClipboard}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faClipboard} />
            <span>Copy</span>
          </button>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="w-full mr-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="w-full ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

const SavedLocationsMap: React.FC<MapProps> = ({
  locations,
  onLocationAdd,
  onLocationDelete,
  onLocationSelect,
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [draftLocation, setDraftLocation] = useState<[number, number] | null>(
    null
  )
  const [selectedActivity, setSelectedActivity] = useState<ActivityEnum | null>(
    null
  )

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        if (selectedActivity) {
          setDraftLocation([e.latlng.lat, e.latlng.lng])
          setModalOpen(true)
        } else {
          alert("Please select an activity type before adding a location.")
        }
      },
    })
    return null
  }

  // Handle pasting coordinates from clipboard
  const handlePasteClipboardLocation = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      const [lat, lng] = clipboardText.split(",").map(Number)

      if (!isNaN(lat) && !isNaN(lng) && selectedActivity) {
        setDraftLocation([lat, lng])
        setModalOpen(true)
      } else if (!selectedActivity) {
        alert("Please select an activity type before adding a location.")
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
    if (draftLocation && selectedActivity) {
      onLocationAdd(
        draftLocation[0],
        draftLocation[1],
        selectedActivity as unknown as string
      )
      setDraftLocation(null)
    }
    setModalOpen(false)
  }

  const closeModal = () => {
    setDraftLocation(null)
    setModalOpen(false)
  }

  return (
    <div className="h-full w-full">
      <div className="p-4">
        <button
          onClick={handlePasteClipboardLocation}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Location from Clipboard
        </button>
      </div>

      <MapContainer
        center={[32.7765, -79.9311]} // Charleston, SC coordinates
        zoom={10}
        className="h-[500px] w-full z-1 rounded-lg shadow-md"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations &&
          locations.map((location) => (
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
                  <div>Activity Type: {location.activity}</div>
                  <button
                    onClick={() => onLocationDelete(location.id)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

        {draftLocation && (
          <Marker position={draftLocation}>
            <Popup>
              New Location: {draftLocation[0]}, {draftLocation[1]}
            </Popup>
          </Marker>
        )}

        <MapEvents />

        {selectedActivity && (
          <Modal
            location={
              draftLocation
                ? {
                    id: Date.now(),
                    name: "New Spot",
                    island: "Unknown Island",
                    latitude: draftLocation[0],
                    longitude: draftLocation[1],
                    location_img_url: "https://example.com/default-image.jpg",
                    minWindspeed: 10,
                    viable_directions: {
                      N: 1,
                      E: 1,
                      S: 1,
                      W: 1,
                      NE: 0,
                      SE: 0,
                      SW: 0,
                      NW: 0,
                    },
                    activity: selectedActivity,
                  }
                : null
            }
            isOpen={modalOpen}
            onClose={closeModal}
            onConfirm={confirmLocation}
          />
        )}
      </MapContainer>
      <div className="w-full flex justify-center items-center mt-4">
        <select
          value={selectedActivity || ""}
          onChange={(e) =>
            setSelectedActivity(e.target.value as unknown as ActivityEnum)
          }
          className="px-4 py-2 bg-white text-black rounded-lg"
        >
          <option value="" disabled>
            Select Activity Type
          </option>
          {Object.values(ActivityEnum).map((activity) => (
            <option key={activity} value={activity}>
              {activity}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SavedLocationsMap
