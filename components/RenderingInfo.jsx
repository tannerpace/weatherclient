"use client"

import useWeather from "@/app/hooks/useWeather"
import React, { useState } from "react"

export function RenderingInfo({ latitude, longitude }) {
  const { weatherData, error } = useWeather({ latitude, longitude })
  const [selectedPeriod, setSelectedPeriod] = useState(null)

  if (error) {
    return <div>Error fetching weather data</div>
  }

  if (!weatherData) {
    return <div>No data available</div>
  }

  const handlePeriodSelect = (periodNumber) => {
    setSelectedPeriod(periodNumber)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  return (
    <div className="space-y-3 rounded-lg bg-gray-900 p-3 m-2">
      <div className="text-sm text-gray-300">
        {weatherData.properties.periods.map((period) => (
          <div
            key={period.number}
            className={`p-2 cursor-pointer ${
              selectedPeriod === period.number ? "bg-gray-700" : "bg-gray-800"
            }`}
            onClick={() => handlePeriodSelect(period.number)}
          >
            <div>
              <strong>{formatDate(period.startTime)}</strong>:{" "}
              {period.shortForecast}
            </div>
            {selectedPeriod === period.number && (
              <div className="mt-2">
                <div>
                  <strong>Date:</strong> {formatDate(period.startTime)}
                </div>
                <div>
                  <strong>Temperature:</strong> {period.temperature}{" "}
                  {period.temperatureUnit}
                </div>
                <div>
                  <strong>Wind:</strong> {period.windSpeed}{" "}
                  {period.windDirection}
                </div>
                <div>
                  <strong>Humidity:</strong> {period?.relativeHumidity?.value}%
                </div>
                <div>
                  <strong>Probability of Precipitation:</strong>{" "}
                  {period.probabilityOfPrecipitation?.value}%
                </div>
                <div>
                  <strong>Forecast:</strong> {period.detailedForecast}
                </div>
                <div>
                  <strong>Full Data:</strong>{" "}
                  <pre>{JSON.stringify(period, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center text-white">
        Stay safe and have fun!
      </div>
    </div>
  )
}
