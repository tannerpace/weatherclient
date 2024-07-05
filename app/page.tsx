"use client"

import React from "react"
import dynamic from "next/dynamic"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import useKiteSurfSpots from "./hooks/useKiteSurfSpots"
import { KitesurfSpot } from "./api/mock"
import { FilterProvider } from "./context/FilterContext"
import { RenderingInfo } from "@/components/RenderingInfo"

config.autoAddCss = false

const Map = dynamic(() => import("@/components/Map"), { ssr: false })

const lat = "32.78621094914123"
const long = "-79.9387649781444"
const center: [number, number] = [parseFloat(lat), parseFloat(long)]

const FilteredApp: React.FC = () => {
  const { data: kitesurfSpots, isLoading } = useKiteSurfSpots()

  return (
    <div className="flex flex-col h-screen p-9">
      <input
        type="text"
        placeholder="Search by name"
        className="mb-4 border border-gray-300 rounded"
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
    <QueryClientProvider client={new QueryClient()}>
      <FilterProvider>
        <div className="prose prose-sm prose-invert max-w-none p-2">
          <h1 className="text-xl font-bold">Kitesurf Ninja</h1>
          <ul>
            <li>
              Kitesurf Ninja helps kiteboarders find the best times to
              kiteboard.
            </li>
            <li>
              We provide up-to-date weather information for optimal kiteboarding
              conditions.
            </li>
            <li>
              Check the weather forecast below to plan your next kiteboarding
              session.
            </li>
          </ul>
          <div className="weather mt-4">
            <h2 className="text-lg font-bold">Current Weather in Charleston</h2>
            <RenderingInfo latitude={lat} longitude={long} />
          </div>
        </div>
        <FilteredApp />
      </FilterProvider>
    </QueryClientProvider>
  )
}

Page.displayName = "Kite Surf Ninja"

export default Page
