"use client"
import React, { useEffect, useState } from "react"
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
import { useWeatherContext } from "@/app/context/WeatherContext"
import Card from "@/components/Card"
import Image from "next/image"
import ActivityEnum from "@/app/enums/ActivityEnum"
import Link from "next/link"

const LocationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { selectedLocation, setSelectedLocation } = useSelectedLocationContext()

  if (!selectedLocation) return null

  const closeModal = () => {
    setSelectedLocation(null)
    onClose()
  }

  const renderActivityDetails = () => {
    switch (selectedLocation.activity) {
      case ActivityEnum.Kitesurfing:
        return (
          <>
            <Card title="Wind Directions">
              <FontAwesomeIcon icon={faWind} className="mr-2 text-blue-500" />
              <span className="text-gray-700">
                {selectedLocation.winddirections}
              </span>
            </Card>
            <Card title="Waves">
              <FontAwesomeIcon icon={faWater} className="mr-2 text-blue-500" />
              <span className="text-gray-700">{selectedLocation.waves}</span>
            </Card>
            <Card title="Depth">
              <FontAwesomeIcon
                icon={faRulerVertical}
                className="mr-2 text-blue-500"
              />
              <span className="text-gray-700">{selectedLocation.depth}</span>
            </Card>
          </>
        )
      case ActivityEnum.Surfing:
        return (
          <>
            <Card title="Waves">
              <FontAwesomeIcon icon={faWater} className="mr-2 text-blue-500" />
              <span className="text-gray-700">{selectedLocation.waves}</span>
            </Card>
            <Card title="Experience Level">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
              <span className="text-gray-700">
                {selectedLocation.experience}
              </span>
            </Card>
          </>
        )
      case ActivityEnum.Fishing:
      case ActivityEnum.FishingRedfish:
        return (
          <>
            <Card title="Depth">
              <FontAwesomeIcon
                icon={faRulerVertical}
                className="mr-2 text-blue-500"
              />
              <span className="text-gray-700">{selectedLocation.depth}</span>
            </Card>
            <Card title="Fishing Tips">
              <FontAwesomeIcon icon={faBook} className="mr-2 text-blue-500" />
              <span className="text-gray-700">
                Best times:{" "}
                {selectedLocation.best_times || "early mornings, late evenings"}
              </span>
            </Card>
          </>
        )
      case ActivityEnum.Hiking:
        return (
          <>
            <Card title="Trail Details">
              <FontAwesomeIcon
                icon={faMapMarkedAlt}
                className="mr-2 text-blue-500"
              />
              <span className="text-gray-700">
                Trail Length: {selectedLocation.trail_length || "various"}
              </span>
            </Card>
            <Card title="Wildlife">
              <FontAwesomeIcon icon={faBook} className="mr-2 text-blue-500" />
              <span className="text-gray-700">
                {selectedLocation.wildlife || "deer, birds"}
              </span>
            </Card>
          </>
        )
      default:
        return <p>No additional details available for this activity.</p>
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-150 p-1"
      style={{ zIndex: "150" }}
    >
      <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-lg h-2/3 overflow-y-scroll shadow-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="flex flex-col items-center">
          {selectedLocation.activity === ActivityEnum.Kitesurfing && (
            <a
              className="text-2xl font-bold mb-4 text-blue-400 hover:text-blue-600 transition-colors duration-300 underline"
              href="https://kitesurf.ninja"
              target="_blank"
              rel="noopener noreferrer"
            >
              More helpful info for {selectedLocation.name} on KiteSurf.Ninja
            </a>
          )}
          <h2 className="text-2xl font-bold mb-4">
            {selectedLocation.activity !== ActivityEnum.Kitesurfing &&
              selectedLocation.name}
          </h2>
          <Image
            src={selectedLocation.location_img_url}
            alt={selectedLocation.name}
            width={200}
            height={200}
            className="w-full h-auto rounded-lg"
          />
          <p className="mt-4 text-center">{selectedLocation.description}</p>
          <div className="mt-4 space-y-4 w-full">
            {renderActivityDetails()}
            <Card title="References">
              <FontAwesomeIcon icon={faBook} className="mr-2 text-blue-500" />
              <a
                href={selectedLocation.references}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-words"
              >
                Learn More
              </a>
            </Card>
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
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default LocationModal
