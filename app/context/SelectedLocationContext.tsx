"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"
import { KitesurfSpot } from "../api/mock"

interface SelectedLocationContextType {
  selectedLocation: KitesurfSpot | null
  setSelectedLocation: (location: KitesurfSpot | null) => void
  showModal: boolean
  setShowModal: (show: boolean) => void
}

const SelectedLocationContext = createContext<
  SelectedLocationContextType | undefined
>(undefined)

export const useSelectedLocationContext = () => {
  const context = useContext(SelectedLocationContext)
  if (!context) {
    throw new Error(
      "useSelectedLocationContext must be used within a SelectedLocationProvider"
    )
  }
  return context
}

export const SelectedLocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<KitesurfSpot | null>(
    null
  )

  return (
    <SelectedLocationContext.Provider
      value={{ selectedLocation, setSelectedLocation, showModal, setShowModal }}
    >
      {children}
    </SelectedLocationContext.Provider>
  )
}
