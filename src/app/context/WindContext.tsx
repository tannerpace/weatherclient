"use client"

import React, { createContext, useState, useContext, ReactNode } from "react"

// Define the type for wind directions
export type WindDirection = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"

// Define the context state
interface WindContextState {
  filter: WindDirection | ""
  setWindFilter: (direction: WindDirection | "") => void
}

// Create the context
const WindContext = createContext<WindContextState | undefined>(undefined)

// Create the provider component
export const WindProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filter, setFilter] = useState<WindDirection | "">("")

  const setWindFilter = (direction: WindDirection | "") => {
    setFilter(direction)
  }

  return (
    <WindContext.Provider value={{ filter, setWindFilter }}>
      {children}
    </WindContext.Provider>
  )
}

// Create a custom hook to use the WindContext
export const useWindContext = (): WindContextState => {
  const context = useContext(WindContext)
  if (context === undefined) {
    throw new Error("useWindContext must be used within a WindProvider")
  }
  return context
}
