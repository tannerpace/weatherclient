"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"
import { ActivitySpot } from "../api/mock"

interface SelectedLocationContextType {
  selectedLocation: ActivitySpot | null
  setSelectedLocation: (location: ActivitySpot | null) => void
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
  const [selectedLocation, setSelectedLocation] = useState<ActivitySpot | null>(
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
