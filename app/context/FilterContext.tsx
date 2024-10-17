import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react"

import ActivityEnum from "@/app/enums/ActivityEnum"
import { useKiteSurfSpots } from "../hooks/useKiteSurfSpots"
import { ActivitySpot } from "../api/mock"

export type WindDirection = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"
export const DEFAULT_LATITUDE = "32.78621094914123"
export const DEFAULT_LONGITUDE = "-79.9387649781444"

interface FilterContextType {
  filteredKitesurfSpots: ActivitySpot[]
  selectedWindDirections: WindDirection[]
  searchTerm: string
  latitude: string
  longitude: string
  selectedActivities: ActivityEnum[]
  handleWindDirectionChange: (value: WindDirection) => void
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleActivityChange: (activities: ActivityEnum[]) => void
  setCoordinates: (lat: string, long: string) => void
}

// Create the context
const FilterContext = createContext<FilterContextType | undefined>(undefined)

// Custom hook to use the FilterContext
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
  const [kitesurfSpots, setKitesurfSpots] = useState<ActivitySpot[]>(
    initialKitesurfSpots || []
  )
  const [filteredKitesurfSpots, setFilteredKitesurfSpots] = useState<
    ActivitySpot[]
  >(initialKitesurfSpots || [])
  const [selectedWindDirections, setSelectedWindDirections] = useState<
    WindDirection[]
  >([])
  const [selectedActivities, setSelectedActivities] = useState<ActivityEnum[]>(
    []
  )
  const [searchTerm, setSearchTerm] = useState("")
  const [latitude, setLatitude] = useState(DEFAULT_LATITUDE)
  const [longitude, setLongitude] = useState(DEFAULT_LONGITUDE)

  // Filter logic
  useEffect(() => {
    let filtered: ActivitySpot[] = kitesurfSpots

    if (selectedWindDirections.length > 0) {
      filtered = filtered.filter(
        (spot) =>
          spot.viable_directions &&
          selectedWindDirections.every(
            (direction) => spot.viable_directions![direction]
          )
      )
    }

    if (selectedActivities.length > 0) {
      filtered = filtered.filter((spot) =>
        selectedActivities.includes(spot.activity as ActivityEnum)
      )
    }

    if (searchTerm) {
      filtered = filtered.filter((spot) =>
        spot.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredKitesurfSpots(filtered)
  }, [selectedWindDirections, selectedActivities, searchTerm, kitesurfSpots])

  // Handlers
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

  const handleActivityChange = (activities: ActivityEnum[]) => {
    setSelectedActivities(activities)
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
      selectedActivities,
      handleWindDirectionChange,
      handleSearchChange,
      handleActivityChange,
      setCoordinates,
    }),
    [
      filteredKitesurfSpots,
      selectedWindDirections,
      searchTerm,
      latitude,
      longitude,
      selectedActivities,
    ]
  )

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  )
}
