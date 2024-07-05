"use client"

import useWeather from "@/app/hooks/useWeather"
import React, { useState } from "react"

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

interface WeatherProps {
  latitude: string
  longitude: string
}

export function RenderingInfo({ latitude, longitude }: WeatherProps) {
  const { data, isLoading, error } = useWeather({ latitude, longitude })
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null)

  if (isLoading) {
    return <div>Loading weather data...</div>
  }

  if (error) {
    return <div>Error fetching weather data: {error.message}</div>
  }

  if (!data) {
    return <div>No data available</div>
  }

  const handlePeriodSelect = (periodNumber: number) => {
    setSelectedPeriod(periodNumber)
  }

  return (
    <div className="space-y-3 rounded-lg bg-gray-900 p-3">
      <div className="text-sm text-gray-300">
        {data.properties.periods.map((period: any) => (
          <div
            key={period.number}
            className={`p-2 cursor-pointer ${
              selectedPeriod === period.number ? "bg-gray-700" : "bg-gray-800"
            }`}
            onClick={() => handlePeriodSelect(period.number)}
          >
            <div>
              <strong>{period.startTime}</strong>: {period.shortForecast}
            </div>
            {selectedPeriod === period.number && (
              <div>
                <div>
                  Temperature: {period.temperature} {period.temperatureUnit}
                </div>
                <div>
                  Wind: {period.windSpeed} {period.windDirection}
                </div>
                <div>Humidity: {period.relativeHumidity.value}%</div>
                <div>Forecast: {period.detailedForecast}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex">Stay safe and have fun!</div>
    </div>
  )
}
