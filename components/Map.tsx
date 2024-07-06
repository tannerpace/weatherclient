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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow, faWind } from "@fortawesome/free-solid-svg-icons"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import { useRouter } from "next/navigation"

import SpotImage from "./SpotImage"
import { KitesurfSpot } from "../app/api/mock"
import { useFilterContext } from "@/app/context/FilterContext"
import { useSelectedLocationContext } from "@/app/context/SelectedLocationContext"
import LocationModal from "@/components/LocationModal"

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
  const router = useRouter()
  const { setCoordinates } = useFilterContext()
  const { setSelectedLocation } = useSelectedLocationContext()

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
    <div style={{ height: "100%", width: "100%" }}>
      {position && kitesurfSpots.length ? (
        <MapContainer
          center={position}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {kitesurfSpots.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.latitude as number, spot.longitude as number]}
            >
              <Popup>
                <div className="p-4 max-w-xs md:max-w-sm">
                  <SpotImage spot={spot} />
                  <div className="font-bold text-xl">{spot.name}</div>
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
                      onClick={() => setSelectedLocation(spot)}
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
                <strong>Selected Location</strong>
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
      <LocationModal />
    </div>
  )
}

export default Map
