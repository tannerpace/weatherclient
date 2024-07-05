"use client"
import React from "react"
import dynamic from "next/dynamic"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import useKiteSurfSpots from "./hooks/useKiteSurfSpots"

import { QueryClientProvider } from "@tanstack/react-query"
import { FilterProvider } from "./context/FilterContext"

import { KitesurfSpot } from "./api/mock"
import { queryClient } from "./queryClient"

config.autoAddCss = false

const Map = dynamic(() => import("@/components/Map"), { ssr: false })

const lat = Number("32.78621094914123")
const long = Number("-79.9387649781444")
const center: [number, number] = [lat, long]

const FilteredApp: React.FC = () => {
  const { data: kitesurfSpots, isLoading } = useKiteSurfSpots()

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
      <div className="w-full p-4 h-full">
        {!isLoading && (
          <Map
            position={center}
            kitesurfSpots={kitesurfSpots as KitesurfSpot[]}
          />
        )}
      </div>
    </div>
  )
}

const Page: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <FilteredApp />
      </FilterProvider>
    </QueryClientProvider>
  )
}

Page.displayName = "Kite Surf Ninja"

export default Page
