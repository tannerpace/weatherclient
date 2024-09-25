"use client"

import React, { useState, useEffect } from "react"
import clsx from "clsx"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

interface WeatherPeriod {
  number: number
  startTime: string
  endTime: string
  isDaytime: boolean
  temperature: number
  temperatureUnit: string
  temperatureTrend: string | null
  probabilityOfPrecipitation: {
    unitCode: string
    value: number
  }
  dewpoint: {
    unitCode: string
    value: number
  }
  relativeHumidity: {
    unitCode: string
    value: number
  }
  windSpeed: string
  windDirection: string
  icon: string
  shortForecast: string
  detailedForecast: string
}

interface WeatherData {
  properties: {
    periods: WeatherPeriod[]
  }
}

interface Item {
  text: string
  slug?: string
  segment?: string
  parallelRoutesKey?: string
  weatherUrl?: string
}

export const Tab = ({
  path,
  parallelRoutesKey,
  item,
}: {
  path: string
  parallelRoutesKey?: string
  item: Item
}) => {
  const segment = useSelectedLayoutSegment(parallelRoutesKey)
  const href = item.slug ? `${path}/${item.slug}` : path
  const isActive =
    (!item.slug && segment === null) ||
    segment === item.segment ||
    segment === item.slug

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeatherData = async (url: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Error fetching weather data")
      }
      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      // @ts-ignore
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isActive && item.weatherUrl) {
      fetchWeatherData(item.weatherUrl)
    }
  }, [isActive, item.weatherUrl])

  return (
    <div>
      <Link
        href={href}
        className={clsx("rounded-lg px-3 py-1 text-sm font-medium", {
          "bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white":
            !isActive,
          "bg-vercel-blue text-white": isActive,
        })}
      >
        {item.text}
      </Link>
      {isActive && weatherData && (
        <div className="mt-2">
          <h2>Weather Forecast</h2>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && (
            <ul>
              {weatherData.properties.periods.map((period) => (
                <li key={period.number}>
                  <p>{new Date(period.startTime).toLocaleString()}</p>
                  <p>
                    {period.shortForecast}, {period.temperature}°
                  </p>
                  <div>
                    Wind: {period.windSpeed} {period.windDirection}
                  </div>
                  {period.relativeHumidity?.value !== undefined && (
                    <div>Humidity: {period.relativeHumidity.value}%</div>
                  )}
                  <div>Forecast: {period.detailedForecast}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
