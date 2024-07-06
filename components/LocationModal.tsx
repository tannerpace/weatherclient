"use client"

import React, { useEffect } from "react"
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

const LocationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { selectedLocation, setSelectedLocation } = useSelectedLocationContext()
  const {
    weatherData,
    loadingForecast,
    loadingObservation,
    loadingForecastGrid,
    errorForecast,
    errorObservation,
    errorForecastGrid,
    setLocation,
  } = useWeatherContext()

  useEffect(() => {
    if (selectedLocation) {
      setLocation(
        selectedLocation.latitude.toString(),
        selectedLocation.longitude.toString()
      )
    }
  }, [selectedLocation, setLocation])

  if (!selectedLocation) return null

  const closeModal = () => {
    setSelectedLocation(null)
    onClose()
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
          <h2 className="text-2xl font-bold mb-4">{selectedLocation.name}</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedLocation.location_img_url}
            alt={selectedLocation.name}
            className="w-full h-auto rounded-lg"
          />
          <p className="mt-4 text-center">{selectedLocation.description}</p>
          <div className="mt-4 space-y-4 w-full">
            <Card title="Island">
              <FontAwesomeIcon
                icon={faMapMarkedAlt}
                className="mr-2 text-blue-500"
              />
              <span className="text-gray-700">{selectedLocation.island}</span>
            </Card>
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
            <Card title="Experience">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
              <span className="text-gray-700">
                {selectedLocation.experience}
              </span>
            </Card>
            <Card title="References">
              <FontAwesomeIcon icon={faBook} className="mr-2 text-blue-500" />
              <a
                href="https://en.wikipedia.org/wiki/Fort_Moultrie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {selectedLocation.references}
              </a>
            </Card>
          </div>
          <div className="mt-4 w-full">
            {loadingForecast || loadingObservation || loadingForecastGrid ? (
              <p>Loading weather data...</p>
            ) : errorForecast || errorObservation || errorForecastGrid ? (
              <div>
                {errorForecast && (
                  <p>Error fetching forecast: {errorForecast}</p>
                )}
                {errorObservation && (
                  <p>Error fetching observation: {errorObservation}</p>
                )}
                {errorForecastGrid && (
                  <p>Error fetching forecast grid data: {errorForecastGrid}</p>
                )}
              </div>
            ) : weatherData ? (
              <div>
                <h3 className="text-lg font-bold">Weather Forecast:</h3>
                {weatherData.properties.periods.map(
                  (
                    period: {
                      startTime: React.ReactNode
                      detailedForecast: React.ReactNode
                    },
                    index: React.Key | null | undefined
                  ) => (
                    <div key={index} className="mt-2">
                      <strong>{period.startTime}</strong>
                      <p>{period.detailedForecast}</p>
                    </div>
                  )
                )}
                <h3 className="text-lg font-bold mt-4">
                  Observation Stations:
                </h3>
                <p>{weatherData.observationStations}</p>
                <h3 className="text-lg font-bold mt-4">Radar Station:</h3>
                <p>{weatherData.radarStation}</p>
              </div>
            ) : null}
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
