import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react"

import useKiteSurfSpots from "../hooks/useKiteSurfSpots"
import { KitesurfSpot } from "../api/mock"

export type WindDirection = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"

export const DEFAULT_LATITUDE = "32.78621094914123"
export const DEFAULT_LONGITUDE = "-79.9387649781444"

interface FilterContextType {
  filteredKitesurfSpots: KitesurfSpot[]
  selectedWindDirections: WindDirection[]
  searchTerm: string
  latitude: string
  longitude: string
  handleWindDirectionChange: (value: WindDirection) => void
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setCoordinates: (lat: string, long: string) => void
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
  const [latitude, setLatitude] = useState(DEFAULT_LATITUDE)
  const [longitude, setLongitude] = useState(DEFAULT_LONGITUDE)

  useEffect(() => {
    let filtered: KitesurfSpot[] = kitesurfSpots

    if (selectedWindDirections.length > 0) {
      filtered = filtered.filter(
        (spot) =>
          spot.viable_directions &&
          selectedWindDirections.every(
            (direction) => spot.viable_directions![direction]
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

  const setCoordinates = (lat: string, long: string) => {
    setLatitude(lat)
    setLongitude(long)
  }

  const contextValue = useMemo(
    () => ({
      filteredKitesurfSpots,
      selectedWindDirections,
      searchTerm,
      latitude,
      longitude,
      handleWindDirectionChange,
      handleSearchChange,
      setCoordinates,
    }),
    [
      filteredKitesurfSpots,
      selectedWindDirections,
      searchTerm,
      latitude,
      longitude,
    ]
  )

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  )
}
