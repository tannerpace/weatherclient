"use client"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { useSelectedLocationContext } from "@/app/context/SelectedLocationContext"

const LocationModal: React.FC = () => {
  const { selectedLocation, setSelectedLocation } = useSelectedLocationContext()

  if (!selectedLocation) return null

  const closeModal = () => {
    setSelectedLocation(null)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-full max-w-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{selectedLocation.name}</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <p>{selectedLocation.description}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={selectedLocation.location_img_url}
          alt={selectedLocation.name}
          className="w-full h-auto mt-4"
        />
        <div className="mt-4 space-y-2">
          <div>
            <strong>Island:</strong> {selectedLocation.island}
          </div>
          <div>
            <strong>Wind Directions:</strong> {selectedLocation.winddirections}
          </div>
          <div>
            <strong>Waves:</strong> {selectedLocation.waves}
          </div>
          <div>
            <strong>Depth:</strong> {selectedLocation.depth}
          </div>
          <div>
            <strong>Experience:</strong> {selectedLocation.experience}
          </div>
          <div>
            <strong>References:</strong> {selectedLocation.references}
          </div>
        </div>
        <div className="mt-4">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.latitude},${selectedLocation.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Go there!
          </a>
        </div>
      </div>
    </div>
  )
}

export default LocationModal
