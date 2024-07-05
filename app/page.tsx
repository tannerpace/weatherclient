"use client"

import React from "react"
import dynamic from "next/dynamic"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import useKiteSurfSpots from "./hooks/useKiteSurfSpots"
import { KitesurfSpot } from "./api/mock"
import { Page } from "./Page.1"

config.autoAddCss = false

const Map = dynamic(() => import("@/components/Map"), { ssr: false })

export const lat = "32.78621094914123"
export const long = "-79.9387649781444"
export const initialCenter: [number, number] = [
  parseFloat(lat),
  parseFloat(long),
]

export const FilteredApp: React.FC<{ center: [number, number] }> = ({
  center,
}) => {
  const { data: kitesurfSpots, isLoading } = useKiteSurfSpots()

  return (
    <div className="flex flex-col h-screen p-6">
      <input
        type="text"
        placeholder="Search by name"
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

Page.displayName = "Kite Surf Ninja"

export default Page
