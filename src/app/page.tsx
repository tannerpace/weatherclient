import React from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"

import { WindProvider, useWindContext } from "@/app/context/WindContext"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import useLocations from "./hooks/useKiteSurfSpots"

config.autoAddCss = false

const Map = dynamic(() => import("@/app/components/Map"), { ssr: false })

const lat = Number("32.78621094914123")
const long = Number("-79.9387649781444")
const center: [number, number] = [lat, long]

const FilteredApp: React.FC = () => {
  const { filter, setWindFilter } = useWindContext()
  const router = useRouter()
  const { data: locations, isLoading } = useLocations()

  const handleLocationClick = (locationId: number) => {
    router.push(`/weather/${locationId}`)
  }

  return (
    <div className="flex flex-col h-screen">
      <input
        type="text"
        placeholder="Search by name"
        // value={searchTerm}
        // onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded"
        style={{
          maxHeight: "3rem",
        }}
      />
      <div className="w-full p-4 h-1/3">
        {!isLoading && (
          <Map
            position={center}
            kitesurfSpots={locations}
            onLocationClick={handleLocationClick}
          />
        )}
      </div>
      <div className="w-full p-4 overflow-y-auto h-1/3">Filter</div>
      item cards
    </div>
  )
}

const App: React.FC = () => {
  return (
    <WindProvider>
      <FilteredApp />
    </WindProvider>
  )
}

App.displayName = "Kite Surf Ninja"

export default App
