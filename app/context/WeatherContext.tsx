import { useEffect, useState, createContext, useContext } from "react"
import { Key, ReactNode } from "react"
import React from "react"
import { useDebounce } from "../hooks/useDebounce"

/**
 * Interface representing the query parameters for fetching weather data.
 */
export interface GetWeatherQuery {
  latitude: string
  longitude: string
}

/**
 * Interface representing the structure of the weather data returned by the API.
 */
export interface WeatherData {
  properties: {
    periods: Array<{
      windSpeed: ReactNode
      windDirection: ReactNode
      temperature: ReactNode
      startTime: ReactNode
      shortForecast: ReactNode
      number: Key | null | undefined
      relativeHumidity: any
      detailedForecast: string
    }>
  }
  observationStations: string
  radarStation: string
}

/**
 * Fetches the forecast office information from the Weather API.
 *
 * @param {string} latitude - The latitude coordinate.
 * @param {string} longitude - The longitude coordinate.
 * @returns {Promise<object>} The URLs of the relevant endpoints.
 * @throws Will throw an error if the request fails.
 */
const getForecastUrls = async (
  latitude: string,
  longitude: string
): Promise<{
  forecast: string
  forecastHourly: string
  forecastGridData: string
  observationStations: string
}> => {
  const response = await fetch(
    `https://api.weather.gov/points/${latitude},${longitude}`
  )
  if (!response.ok) {
    throw new Error("Error fetching forecast office information")
  }
  const data = await response.json()
  return {
    forecast: data.properties.forecast,
    forecastHourly: data.properties.forecastHourly,
    forecastGridData: data.properties.forecastGridData,
    observationStations: data.properties.observationStations,
  }
}

/**
 * Fetches weather data from the API.
 *
 * @param {string} forecastUrl - The URL of the forecast endpoint.
 * @returns {Promise<WeatherData>} The weather data fetched from the API.
 * @throws Will throw an error if the request fails.
 */
const getWeatherData = async (forecastUrl: string): Promise<WeatherData> => {
  const response = await fetch(forecastUrl)
  if (!response.ok) {
    throw new Error("Error fetching weather data")
  }
  return response.json()
}

/**
 * Fetches additional data from observation stations and radar station.
 *
 * @param {string} observationStationsUrl - The URL of the observation stations endpoint.
 * @param {string} forecastGridDataUrl - The URL of the forecast grid data endpoint.
 * @returns {Promise<{ observationData: any; forecastGridData: any }>} The additional data fetched from the API.
 * @throws Will throw an error if the request fails.
 */
const getAdditionalData = async (
  observationStationsUrl: string,
  forecastGridDataUrl: string
): Promise<{ observationData: any; forecastGridData: any }> => {
  const observationResponse = await fetch(observationStationsUrl)
  if (!observationResponse.ok) {
    throw new Error("Error fetching observation stations data")
  }
  const observationData = await observationResponse.json()

  const forecastGridDataResponse = await fetch(forecastGridDataUrl)
  if (!forecastGridDataResponse.ok) {
    throw new Error("Error fetching forecast grid data")
  }
  const forecastGridData = await forecastGridDataResponse.json()

  return { observationData, forecastGridData }
}

/**
 * Custom hook to get weather data using fetch and debounced coordinates.
 *
 * @param {GetWeatherQuery} data - The query parameters containing latitude and longitude.
 * @returns {Object} The state of the weather data fetching process, including statuses and data.
 */
const useWeather = (data: GetWeatherQuery) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loadingForecast, setLoadingForecast] = useState<boolean>(false)
  const [loadingObservation, setLoadingObservation] = useState<boolean>(false)
  const [loadingForecastGrid, setLoadingForecastGrid] = useState<boolean>(false)
  const [errorForecast, setErrorForecast] = useState<string | null>(null)
  const [errorObservation, setErrorObservation] = useState<string | null>(null)
  const [errorForecastGrid, setErrorForecastGrid] = useState<string | null>(
    null
  )

  const debouncedLatitude = useDebounce(data.latitude, 800)
  const debouncedLongitude = useDebounce(data.longitude, 800)

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!debouncedLatitude || !debouncedLongitude) return

      try {
        setLoadingForecast(true)
        setErrorForecast(null)
        const {
          forecast,
          forecastHourly,
          forecastGridData,
          observationStations,
        } = await getForecastUrls(debouncedLatitude, debouncedLongitude)
        const forecastData = await getWeatherData(forecast)
        setWeatherData(forecastData)

        setLoadingObservation(true)
        setErrorObservation(null)
        const { observationData } = await getAdditionalData(
          observationStations,
          ""
        )
        setWeatherData((prevData) =>
          prevData ? { ...prevData, observationData } : null
        )
        setLoadingObservation(false)

        setLoadingForecastGrid(true)
        setErrorForecastGrid(null)
        const { forecastGridData: gridData } = await getAdditionalData(
          "",
          forecastGridData
        )
        setWeatherData((prevData) =>
          prevData ? { ...prevData, forecastGridData: gridData } : null
        )
        setLoadingForecastGrid(false)
      } catch (err) {
        //@ts-ignore
        setErrorForecast(err.message)
        setLoadingForecast(false)
        setLoadingObservation(false)
        setLoadingForecastGrid(false)
      }
    }

    fetchWeatherData()
  }, [debouncedLatitude, debouncedLongitude])

  return {
    weatherData,
    loadingForecast,
    loadingObservation,
    loadingForecastGrid,
    errorForecast,
    errorObservation,
    errorForecastGrid,
  }
}

export default useWeather

// Context and Provider setup

interface WeatherContextType {
  weatherData: WeatherData | null
  loadingForecast: boolean
  loadingObservation: boolean
  loadingForecastGrid: boolean
  errorForecast: string | null
  errorObservation: string | null
  errorForecastGrid: string | null
  setLocation: (latitude: string, longitude: string) => void
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<GetWeatherQuery | null>(null)
  const {
    weatherData,
    loadingForecast,
    loadingObservation,
    loadingForecastGrid,
    errorForecast,
    errorObservation,
    errorForecastGrid,
  } = useWeather(location ? location : { latitude: "", longitude: "" })

  const updateLocation = (latitude: string, longitude: string) => {
    setLocation({ latitude, longitude })
  }

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loadingForecast,
        loadingObservation,
        loadingForecastGrid,
        errorForecast,
        errorObservation,
        errorForecastGrid,
        setLocation: updateLocation,
      }}
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
