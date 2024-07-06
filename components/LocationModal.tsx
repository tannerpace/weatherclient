"use client"

import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTimes,
  faMapMarkedAlt,
  faWind,
  faWater,
  faRulerVertical,
  faUser,
  faBook,
} from "@fortawesome/free-solid-svg-icons"
import { useSelectedLocationContext } from "@/app/context/SelectedLocationContext"

const LocationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { selectedLocation, setSelectedLocation } = useSelectedLocationContext()

  if (!selectedLocation) return null

  const closeModal = () => {
    setSelectedLocation(null)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      style={{
        zIndex: "150",
      }}
    >
      <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">{selectedLocation.name}</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedLocation.location_img_url}
            alt={selectedLocation.name}
            className="w-full h-auto rounded-lg"
          />
          <p className="mt-4 text-center">{selectedLocation.description}</p>
          <div className="mt-4 space-y-2 w-full">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faMapMarkedAlt}
                className="mr-2 text-blue-500"
              />
              <strong>Island:</strong> {selectedLocation.island}
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faWind} className="mr-2 text-blue-500" />
              <strong>Wind Directions:</strong>{" "}
              {selectedLocation.winddirections}
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faWater} className="mr-2 text-blue-500" />
              <strong>Waves:</strong> {selectedLocation.waves}
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faRulerVertical}
                className="mr-2 text-blue-500"
              />
              <strong>Depth:</strong> {selectedLocation.depth}
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
              <strong>Experience:</strong> {selectedLocation.experience}
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBook} className="mr-2 text-blue-500" />
              <strong>References:</strong> {selectedLocation.references}
            </div>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-grey rounded-lg p-4 w-full max-w-lg">
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
          <div className="mt-6">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.latitude},${selectedLocation.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-500 hover:underline"
            >
              Navigate to {selectedLocation.name}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationModal