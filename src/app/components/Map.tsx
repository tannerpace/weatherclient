"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow, faGlobe } from "@fortawesome/free-solid-svg-icons"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import { WindDirection } from "../context/FilterContext"
import { KitesurfSpot } from "../../../mock"

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
  onLocationClick: (id: number) => void
}

const Map: React.FC<MapProps> = ({
  position,
  kitesurfSpots,
  onLocationClick,
}) => {
  return (
    <div className="map-container" style={{ height: "500px", width: "100%" }}>
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
              position={[spot.latitude, spot.longitude]}
              eventHandlers={{
                click: () => {
                  onLocationClick(spot.id)
                },
              }}
            >
              <Popup>
                <div>
                  {spot.location_img_url ? (
                    <img
                      src={spot.location_img_url}
                      alt={spot.name}
                      style={{ width: "100%", marginBottom: "0.5rem" }}
                    />
                  ) : null}
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {spot.name}
                  </div>
                  <p>{spot.description}</p>
                  <div>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${spot.latitude},${spot.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "green",
                        textDecoration: "underline",
                        marginTop: "0.7rem",
                        fontSize: "1.1rem",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faLocationArrow}
                        style={{ marginRight: "0.5rem" }}
                      />
                      Go
                    </a>
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
