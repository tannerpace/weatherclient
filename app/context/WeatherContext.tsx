"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import useWeather, {
  GetWeatherQuery,
  WeatherData,
} from "@/app/hooks/useWeather"

interface WeatherContextType {
  weatherData: WeatherData | null
  loading: boolean
  error: string | null
  setLocation: (latitude: string, longitude: string) => void
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<GetWeatherQuery | null>(null)
  const { weatherData, loading, error } = useWeather(
    location ? location : { latitude: "", longitude: "" }
  )

  const updateLocation = (latitude: string, longitude: string) => {
    setLocation({ latitude, longitude })
  }

  return (
    <WeatherContext.Provider
      value={{ weatherData, loading, error, setLocation: updateLocation }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeatherContext = () => {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider")
  }
  return context
}
