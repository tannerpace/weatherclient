
import locations from "./mock"

import { createContext, useContext, useState, useEffect } from "react"

// Create a new context for the location
const LocationContext = createContext()

export default LocationContext

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState([0, 0])
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [selectedLocationCoordinates, setSelectedLocationCoordinates] =
    useState([locations[0].latitude, locations[0].longitude])
  const [selectedEndPoints, setSelectedEndPoints] = useState([
    locations[0].latitude,
    locations[0].longitude,
  ])
  const [selectedStartPoints, setSelectedStartPoints] = useState([
    locations[0].latitude,
    locations[0].longitude,
  ])
  const [selectedTime, setSelectedTime] = useState(new Date())

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message)
          alert("We need location permission to show you the weather!")
        }
      )
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
  }, [])

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        setUserLocation,
        selectedLocation,
        setSelectedLocation,
        selectedEndPoints,
        setSelectedEndPoints,
        selectedStartPoints,
        setSelectedStartPoints,
        selectedTime,
        setSelectedTime,
        selectedLocationCoordinates,
        setSelectedLocationCoordinates,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocationContext() {
  const locationContext = useContext(LocationContext)
  if (!locationContext) {
    throw new Error(
      "Location Context must be called within a location provider"
    )
  }
  return locationContext
}
