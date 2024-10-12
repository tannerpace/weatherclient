"use client"
import React, { useEffect, useState, useRef } from "react"

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  MarkerProps,
} from "react-leaflet"
import L, { LatLngLiteral } from "leaflet"
import "leaflet/dist/leaflet.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow, faWind } from "@fortawesome/free-solid-svg-icons"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"

import { KitesurfSpot, ViableDirections } from "../app/api/mock"
import { useFilterContext } from "@/app/context/FilterContext"
import { useSelectedLocationContext } from "@/app/context/SelectedLocationContext"
import { useWeatherContext } from "@/app/context/WeatherContext"
import { debounce } from "@mui/material"
import { blueGrey } from "@mui/material/colors"
import BottomNavigationBar from "./BottomNavBar"
import { FilteredAppProps } from "@/app/page"

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
  center: [number, number] | null
  kitesurfSpots: KitesurfSpot[]
  userLocation: Pick<FilteredAppProps, "userLocation">
}

const getWindSpeedColor = (windSpeed: string): string => {
  const speed = parseFloat(windSpeed)
  return speed > 14 ? "green" : "inherit"
}

const getWindDirectionColor = (
  windDirection: unknown,
  viableDirections: ViableDirections | null
): string => {
  if (typeof windDirection === "string" && viableDirections) {
    return viableDirections[
      windDirection.toUpperCase() as keyof ViableDirections
    ]
      ? "green"
      : "inherit"
  }
  return "inherit"
}

const Map: React.FC<MapProps> = ({ center, kitesurfSpots, userLocation }) => {
  const { setCoordinates } = useFilterContext()
  const { setSelectedLocation, setShowModal } = useSelectedLocationContext()
  const { weatherData, setLocation } = useWeatherContext()
  const [selectedSpot, setSelectedSpot] = useState<KitesurfSpot | null>(null)

  const debouncedSetLocationRef = useRef<any>()

  useEffect(() => {
    debouncedSetLocationRef.current = debounce(
      (latitude: string, longitude: string) => {
        setLocation(latitude, longitude)
      },
      300
    )
  }, [setLocation])

  useEffect(() => {
    if (selectedSpot) {
      debouncedSetLocationRef.current(
        selectedSpot.latitude.toString(),
        selectedSpot.longitude.toString()
      )
    }
  }, [selectedSpot])

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

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    }
  }

  return (
    <div
      className="map-container  bg-black shadow-lg min-h-screen text-white p-2"
      style={{
        width: "100%",
        backgroundColor: "blueGrey",
      }}
    >
      <div style={{ height: "100%", width: "100%", zIndex: 0 }}>
        {center && center[0] ? (
          <MapContainer
            center={(userLocation as unknown as LatLngLiteral) || center}
            zoom={10}
            style={{
              height: "100%",
              width: "100%",
              zIndex: 1,
              minHeight: "calc(100vh - 60px)",
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {kitesurfSpots.map((spot) => (
              <Marker
                key={spot.id}
                position={[spot.latitude, spot.longitude]}
                eventHandlers={{ click: () => setSelectedSpot(spot) }}
              >
                <Popup>
                  <div>
                    <div className="font-bold text-xl text-gray-800 mb-2">
                      {spot.name}
                    </div>
                    {weatherData ? (
                      <div className="text-gray-700">
                        <div>
                          <strong className="text-gray-400">
                            Temperature:
                          </strong>{" "}
                          {weatherData.properties.periods[0].temperature}°C
                        </div>
                        <div
                          style={{
                            color: getWindSpeedColor(
                              weatherData.properties.periods[0]
                                .windSpeed as string
                            ),
                          }}
                        >
                          <strong
                            className="text-gray-400"
                            style={{
                              color: getWindSpeedColor(
                                weatherData.properties.periods[0]
                                  .windSpeed as string
                              ),
                            }}
                          >
                            Wind Speed:
                          </strong>{" "}
                          {weatherData.properties.periods[0].windSpeed}
                        </div>
                        <div
                          style={{
                            color: getWindDirectionColor(
                              weatherData.properties.periods[0].windDirection,
                              spot.viable_directions
                            ),
                          }}
                        >
                          <strong
                            className="text-gray-400"
                            style={{
                              color: getWindDirectionColor(
                                weatherData.properties.periods[0].windDirection,
                                spot.viable_directions
                              ),
                            }}
                          >
                            Wind Direction:
                          </strong>{" "}
                          {weatherData.properties.periods[0].windDirection}
                        </div>
                        <div>
                          <strong className="text-gray-400">Forecast:</strong>{" "}
                          {weatherData.properties.periods[0].shortForecast}
                        </div>
                        <div>
                          <strong className="text-gray-400">Date:</strong>{" "}
                          {
                            formatDateTime(
                              weatherData.properties.periods[0].startTime
                            ).date
                          }
                        </div>
                        <div>
                          <strong className="text-gray-400">Time:</strong>{" "}
                          {
                            formatDateTime(
                              weatherData.properties.periods[0].startTime
                            ).time
                          }
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        Loading weather data...
                      </div>
                    )}
                    <div className="flex space-x-4 mt-4">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${spot.latitude},${spot.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-green-600 underline text-lg hover:text-green-800"
                      >
                        <FontAwesomeIcon
                          icon={faLocationArrow}
                          className="mr-2"
                        />
                        Go
                      </a>
                      <button
                        onClick={() => handleShowModal(spot)}
                        className="flex items-center text-white-900 underline text-lg hover:text-blue-800"
                      >
                        <FontAwesomeIcon icon={faWind} className="mr-2" />
                        More Info
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
            {userLocation && (
              <Marker
                position={userLocation as unknown as LatLngLiteral}
                icon={userIcon}
              >
                <Popup>
                  <div>
                    {weatherData ? (
                      <div className="text-gray-700">
                        <div>
                          <strong className="text-gray-400">
                            Temperature:
                          </strong>{" "}
                          {weatherData.properties.periods[0].temperature}°C
                        </div>
                        <div>
                          <strong className="text-gray-400">Wind Speed:</strong>{" "}
                          {weatherData.properties.periods[0].windSpeed}
                        </div>
                        <div>
                          <strong className="text-gray-400">
                            Wind Direction:
                          </strong>{" "}
                          {weatherData.properties.periods[0].windDirection}
                        </div>
                        <div>
                          <strong className="text-gray-400">Forecast:</strong>{" "}
                          {weatherData.properties.periods[0].shortForecast}
                        </div>
                        <div>
                          <strong className="text-gray-400">Date:</strong>{" "}
                          {
                            formatDateTime(
                              weatherData.properties.periods[0]
                                .startTime as string
                            ).date
                          }
                        </div>
                        <div>
                          <strong className="text-gray-400">Time:</strong>{" "}
                          {
                            formatDateTime(
                              weatherData.properties.periods[0]
                                .startTime as string
                            ).time
                          }
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        Loading weather data...
                      </div>
                    )}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${center[0]},${center[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-green-600 underline text-lg mt-2 hover:text-green-800"
                    >
                      <FontAwesomeIcon
                        icon={faLocationArrow}
                        className="mr-2"
                      />
                      Drive to this location
                    </a>
                  </div>
                </Popup>
              </Marker>
            )}
            <MapEvents />
            <BottomNavigationBar />
          </MapContainer>
        ) : (
          <div style={{ height: "100%", width: "100%" }}></div>
        )}
      </div>
    </div>
  )
}

export default Map
