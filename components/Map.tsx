import React from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow, faWind } from "@fortawesome/free-solid-svg-icons"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import { useRouter } from "next/navigation" // Correct import for App Router

import SpotImage from "./SpotImage"
import Link from "next/link"
import { KitesurfSpot } from "../app/api/mock"

config.autoAddCss = false

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface MapProps {
  position: [number, number] | null
  kitesurfSpots: KitesurfSpot[]
}

const Map: React.FC<MapProps> = ({ position, kitesurfSpots }) => {
  const router = useRouter()

  const handleWeatherClick = (spotId: number) => {
    router.push(`/spots/${spotId}`)
  }

  return (
    <div className="map-container" style={{ height: "100%", width: "100%" }}>
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
                <div>
                  <SpotImage spot={spot} />
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {spot.name}
                  </div>
                  <p>{spot.description}</p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${spot.latitude},${spot.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "green",
                        textDecoration: "underline",
                        fontSize: "1.1rem",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faLocationArrow}
                        style={{ marginRight: "0.5rem" }}
                      />
                      Go
                    </a>
                    <Link href={`/ssr/${spot.id}`} passHref>
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "transparent",
                          border: "none",
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                          fontSize: "1.1rem",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faWind}
                          style={{ marginRight: "0.5rem" }}
                        />
                        View Weather
                      </button>
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
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
