"use client"
import React, { useEffect, useState } from "react"
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
import { faLocationArrow, faWind } from "@fortawesome/free-solid-svg-icons"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"

import { KitesurfSpot } from "../app/api/mock"
import { useFilterContext } from "@/app/context/FilterContext"
import { useSelectedLocationContext } from "@/app/context/SelectedLocationContext"
import { useWeatherContext } from "@/app/context/WeatherContext"

config.autoAddCss = false

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

const userIcon = new L.Icon({
  iconUrl: "/user-location-icon.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

interface MapProps {
  position: [number, number] | null
  kitesurfSpots: KitesurfSpot[]
}

const Map: React.FC<MapProps> = ({ position, kitesurfSpots }) => {
  const { setCoordinates } = useFilterContext()
  const { setSelectedLocation, setShowModal } = useSelectedLocationContext()
  const { weatherData, setLocation } = useWeatherContext()
  const [selectedSpot, setSelectedSpot] = useState<KitesurfSpot | null>(null)

  useEffect(() => {
    if (selectedSpot) {
      setLocation(
        selectedSpot.latitude.toString(),
        selectedSpot.longitude.toString()
      )
    }
  }, [selectedSpot, setLocation])

  const handleShowModal = (spot: KitesurfSpot) => {
    setSelectedLocation(spot)
    setShowModal(true)
  }

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setCoordinates(lat.toString(), lng.toString())
      },
    })
    return null
  }

  return (
    <div
      style={{ height: "100%", width: "100%", position: "relative", zIndex: 0 }}
    >
      {position && kitesurfSpots.length ? (
        <MapContainer
          center={position}
          zoom={12}
          style={{ height: "100%", width: "100%", zIndex: 1 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {kitesurfSpots.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.latitude as number, spot.longitude as number]}
              eventHandlers={{
                click: () => {
                  setSelectedSpot(spot)
                },
              }}
            >
              <Popup>
                <div className="p-4 max-w-xs md:max-w-sm">
                  <div className="font-bold text-xl">{spot.name}</div>
                  {weatherData ? (
                    <div>
                      <div>
                        <strong>Temperature:</strong>{" "}
                        {weatherData.properties.periods[0].temperature}°C
                      </div>
                      <div>
                        <strong>Wind Speed:</strong>{" "}
                        {weatherData.properties.periods[0].windSpeed}
                      </div>
                      <div>
                        <strong>Wind Direction:</strong>{" "}
                        {weatherData.properties.periods[0].windDirection}
                      </div>
                      <div>
                        <strong>Forecast:</strong>{" "}
                        {weatherData.properties.periods[0].shortForecast}
                      </div>
                    </div>
                  ) : (
                    <div>Loading weather data...</div>
                  )}
                  <div className="flex justify-between mt-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${spot.latitude},${spot.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-green-600 underline text-lg"
                    >
                      <FontAwesomeIcon
                        icon={faLocationArrow}
                        className="mr-2"
                      />
                      Go
                    </a>
                    <button
                      onClick={() => handleShowModal(spot)}
                      className="flex items-center text-blue-600 underline text-lg"
                    >
                      <FontAwesomeIcon icon={faWind} className="mr-2" />
                      More Info
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          <Marker position={position} icon={userIcon}>
            <Popup>
              <div>
                <strong>Showing Weather for this location</strong>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-green-600 underline text-lg mt-2"
                >
                  <FontAwesomeIcon icon={faLocationArrow} className="mr-2" />
                  Drive to this location
                </a>
              </div>
            </Popup>
          </Marker>
          <MapEvents />
        </MapContainer>
      ) : (
        <div style={{ height: "100%", width: "100%" }}>
          {/* <Skeleton height="100%" /> */}
        </div>
      )}
    </div>
  )
}

export default Map
