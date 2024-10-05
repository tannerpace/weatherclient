import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  Key,
} from "react"
import { useDebounce } from "../hooks/useDebounce" // Adjust the import path to your debounce hook

// Interface representing the coordinates for fetching weather data
export interface Coordinates {
  latitude: string
  longitude: string
}

// Interface representing the structure of the weather data returned by the API
export interface WeatherData {
  properties: {
    periods: Array<{
      windSpeed: string
      windDirection: string
      temperature: number
      startTime: string
      shortForecast: string
      number: Key
      relativeHumidity?: { value: number }
      detailedForecast: string
      icon: string
    }>
  }
  observationStations: string
  radarStation: string
}

// Interface for the weather context type
interface WeatherContextType {
  location: Coordinates
  weatherData: WeatherData | null
  // Individual loading states
  loadingForecast: boolean
  loadingObservation: boolean
  loadingForecastGrid: boolean
  // Individual error states
  errorForecast: string | null
  errorObservation: string | null
  errorForecastGrid: string | null
  // Method to set the location
  setLocation: (latitude: string, longitude: string) => void
}

// Create the WeatherContext with an undefined initial state
const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

// Hook to use WeatherContext
export const useWeatherContext = () => {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider")
  }
  return context
}

/**
 * Fetches the forecast office information from the Weather API.
 */
const getForecastUrls = async ({
  latitude,
  longitude,
}: Coordinates): Promise<{
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
  const weatherDataResponse = await response.json()
  return {
    forecast: weatherDataResponse.properties.forecast,
    forecastHourly: weatherDataResponse.properties.forecastHourly,
    forecastGridData: weatherDataResponse.properties.forecastGridData,
    observationStations: weatherDataResponse.properties.observationStations,
  }
}

/**
 * Fetches weather data from the API.
 */
const getWeatherData = async (forecastUrl: string): Promise<WeatherData> => {
  const response = await fetch(forecastUrl)
  if (!response.ok) {
    const errorText = await response.text()
    console.error("Error fetching weather data:", errorText)
    throw new Error("Error fetching weather data")
  }
  return response.json()
}

/**
 * Fetches additional data from observation stations and radar station.
 */
const getAdditionalData = async (
  observationStationsUrl: string,
  forecastGridDataUrl: string
): Promise<{ observationData: any; forecastGridData: any }> => {
  const [observationData, forecastGridData] = await Promise.all([
    fetch(observationStationsUrl).then((res) => {
      if (!res.ok) throw new Error("Error fetching observation stations data")
      return res.json()
    }),
    fetch(forecastGridDataUrl).then((res) => {
      if (!res.ok) throw new Error("Error fetching forecast grid data")
      return res.json()
    }),
  ])
  return { observationData, forecastGridData }
}

/**
 * Custom hook to get weather data using fetch and debounced coordinates.
 */
const useWeather = (weatherQueryRequest: Coordinates) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState({
    forecast: true,
    observation: false,
    forecastGrid: false,
  })
  const [errors, setErrors] = useState<{
    forecast: string | null
    observation: string | null
    forecastGrid: string | null
  }>({
    forecast: null,
    observation: null,
    forecastGrid: null,
  })

  const debouncedLatitude = useDebounce(weatherQueryRequest.latitude, 800)
  const debouncedLongitude = useDebounce(weatherQueryRequest.longitude, 800)

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!debouncedLatitude || !debouncedLongitude) return

      try {
        setLoading((prev) => ({ ...prev, forecast: true }))
        setErrors((prev) => ({ ...prev, forecast: null }))

        const { forecast, forecastGridData, observationStations } =
          await getForecastUrls({
            latitude: debouncedLatitude,
            longitude: debouncedLongitude,
          })
        const forecastData = await getWeatherData(forecast)
        setWeatherData(forecastData)
        setLoading((prev) => ({ ...prev, forecast: false }))

        setLoading((prev) => ({
          ...prev,
          observation: true,
          forecastGrid: true,
        }))
        setErrors((prev) => ({
          ...prev,
          observation: null,
          forecastGrid: null,
        }))

        const { observationData, forecastGridData: gridData } =
          await getAdditionalData(observationStations, forecastGridData)

        setWeatherData((prevData) =>
          prevData
            ? { ...prevData, observationData, forecastGridData: gridData }
            : null
        )
        setLoading((prev) => ({
          ...prev,
          observation: false,
          forecastGrid: false,
        }))
      } catch (err) {
        console.error("Error fetching weather data:", err)
        setErrors((prev) => ({
          ...prev,
          forecast: (err as Error).message,
          observation: (err as Error).message,
          forecastGrid: (err as Error).message,
        }))
        setLoading({ forecast: false, observation: false, forecastGrid: false })
      }
    }

    fetchWeatherData()
  }, [debouncedLatitude, debouncedLongitude])

  return {
    weatherData,
    loading,
    errors,
  }
}

/**
 * WeatherProvider component to provide weather data and controls to its children.
 */
export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<Coordinates>({
    latitude: "",
    longitude: "",
  })
  const { weatherData, loading, errors } = useWeather(location)

  const updateLocation = (latitude: string, longitude: string) => {
    setLocation({ latitude, longitude })
  }

  return (
    <WeatherContext.Provider
      value={{
        location,
        weatherData,
        // Pass individual loading states
        loadingForecast: loading.forecast,
        loadingObservation: loading.observation,
        loadingForecastGrid: loading.forecastGrid,
        // Pass individual error states
        errorForecast: errors.forecast,
        errorObservation: errors.observation,
        errorForecastGrid: errors.forecastGrid,
        setLocation: updateLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export default useWeather
