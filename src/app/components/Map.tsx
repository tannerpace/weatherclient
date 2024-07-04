"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import { WindDirection } from "../context/WindContext"

config.autoAddCss = false

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

export interface KitesurfSpot {
  location_id: number
  location_name: string
  location_latitude: number
  location_longitude: number
  description: string
  location_img_url: string
  viable_directions: {
    [key in WindDirection]: number
  }
}

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
      {position ? (
        <MapContainer zoom={12} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {kitesurfSpots.map((spot) => (
            <Marker
              key={spot.location_id}
              position={[spot.location_latitude, spot.location_longitude]}
              eventHandlers={{
                click: () => {
                  onLocationClick(spot.location_id)
                },
              }}
            >
              <Popup>
                <div>
                  {spot.location_img_url ? (
                    <img
                      src={spot.location_img_url}
                      alt={spot.location_name}
                      style={{ width: "100%", marginBottom: "0.5rem" }}
                    />
                  ) : null}
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {spot.location_name}
                  </div>
                  <p>{spot.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div style={{ height: "100%", width: "100%" }}>Loading</div>
      )}
    </div>
  )
}

export default Map
