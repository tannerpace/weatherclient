"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

import useKiteSurfSpots from "../hooks/useKiteSurfSpots"
import { KitesurfSpot } from "../../../mock"

export type WindDirection = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"

// Define the context state
interface WindContextState {
  filter: WindDirection | ""
  setWindFilter: (direction: WindDirection | "") => void
}

interface FilterContextType {
  filteredKitesurfSpots: KitesurfSpot[]
  selectedWindDirections: WindDirection[]
  searchTerm: string
  handleWindDirectionChange: (value: WindDirection) => void
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider")
  }
  return context
}

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: initialKitesurfSpots } = useKiteSurfSpots()
  const [kitesurfSpots, setKitesurfSpots] = useState<KitesurfSpot[]>(
    initialKitesurfSpots || []
  )
  const [filteredKitesurfSpots, setFilteredKitesurfSpots] = useState<
    KitesurfSpot[]
  >(initialKitesurfSpots || [])
  const [selectedWindDirections, setSelectedWindDirections] = useState<
    WindDirection[]
  >([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    let filtered: KitesurfSpot[] = kitesurfSpots

    if (selectedWindDirections.length > 0) {
      filtered = filtered.filter((spot) =>
        selectedWindDirections.every(
          (direction) => spot.viable_directions[direction]
        )
      )
    }

    if (searchTerm) {
      filtered = filtered.filter((spot) =>
        spot.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredKitesurfSpots(filtered)
  }, [selectedWindDirections, searchTerm, kitesurfSpots])

  const handleWindDirectionChange = (value: WindDirection) => {
    setSelectedWindDirections((prevSelected) =>
      !prevSelected.includes(value)
        ? [...prevSelected, value]
        : prevSelected.filter((direction) => direction !== value)
    )
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <FilterContext.Provider
      value={{
        filteredKitesurfSpots,
        selectedWindDirections,
        searchTerm,
        handleWindDirectionChange,
        handleSearchChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
