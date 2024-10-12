import React, { useEffect, useState, useRef } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet"
import L, { LatLngLiteral } from "leaflet"
import "leaflet/dist/leaflet.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow, faWind } from "@fortawesome/free-solid-svg-icons"
import { config } from "@fortawesome/fontawesome-svg-core"
import { KitesurfSpot, ViableDirections } from "../app/api/mock"
import { useFilterContext } from "@/app/context/FilterContext"
import { useSelectedLocationContext } from "@/app/context/SelectedLocationContext"
import { useWeatherContext } from "@/app/context/WeatherContext"
import { debounce } from "@mui/material"
import BottomNavigationBar from "./BottomNavBar"

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
  userLocation: LatLngLiteral | null
}

const Map: React.FC<MapProps> = ({ center, kitesurfSpots, userLocation }) => {
  const { setCoordinates } = useFilterContext()
  const { setSelectedLocation, setShowModal } = useSelectedLocationContext()
  const { weatherData, setLocation } = useWeatherContext()
  const [selectedSpot, setSelectedSpot] = useState<KitesurfSpot | null>(null)
  const [shouldCenterOnUser, setShouldCenterOnUser] = useState(false)

  const mapRef = useRef<any>(null) // Reference for the map

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

  const CenterOnUser = () => {
    const map = useMap()

    useEffect(() => {
      if (shouldCenterOnUser && userLocation) {
        map.setView(userLocation, 13, { animate: true })
        setShouldCenterOnUser(false) // Reset after centering
      }
    }, [shouldCenterOnUser, userLocation, map])

    return null
  }

  const handleMarkerClick = (spot: KitesurfSpot) => {
    setSelectedSpot(spot)
    if (mapRef.current) {
      // Center the map on the clicked marker
      mapRef.current.setView([spot.latitude, spot.longitude], 13, {
        animate: true,
      })
    }
  }

  return (
    <>
      <div
        className="map-container bg-black shadow-lg min-h-screen text-white p-2"
        style={{ width: "100%", backgroundColor: "blueGrey" }}
      >
        <div style={{ height: "100%", width: "100%", zIndex: 0 }}>
          {center && center[0] ? (
            <MapContainer
              center={(userLocation as LatLngLiteral) || center}
              zoom={10}
              ref={mapRef} // Reference the MapContainer
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
                  eventHandlers={{
                    click: () => handleMarkerClick(spot), // Center on marker click
                  }}
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
                              color: "green",
                            }}
                          >
                            <strong className="text-gray-400">
                              Wind Speed:
                            </strong>{" "}
                            {weatherData.properties.periods[0].windSpeed}
                          </div>
                          <div>
                            <strong className="text-gray-400">Forecast:</strong>{" "}
                            {weatherData.properties.periods[0].shortForecast}
                          </div>
                          <div>
                            <strong className="text-gray-400">Date:</strong>{" "}
                            {new Date(
                              weatherData.properties.periods[0].startTime
                            ).toLocaleDateString()}
                          </div>
                          <div>
                            <strong className="text-gray-400">Time:</strong>{" "}
                            {new Date(
                              weatherData.properties.periods[0].startTime
                            ).toLocaleTimeString()}
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          Loading weather data...
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}

              {userLocation && (
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>
                    <div>You are here</div>
                  </Popup>
                </Marker>
              )}

              <MapEvents />
              <CenterOnUser />
              <BottomNavigationBar />
            </MapContainer>
          ) : (
            <div style={{ height: "100%", width: "100%" }}></div>
          )}
        </div>

        {/* Button to center on user location */}
        <button
          onClick={() => setShouldCenterOnUser(true)}
          className="center-button"
        >
          <FontAwesomeIcon icon={faLocationArrow} /> Center on me
        </button>
      </div>
    </>
  )
}

export default Map
