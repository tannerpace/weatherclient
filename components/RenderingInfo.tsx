"use client"

import React, { useState, useEffect, useMemo } from "react"
import { FormControl, FormControlLabel, RadioGroup, Radio } from "@mui/material"
import useWeather from "@/app/context/WeatherContext"

interface RenderingInfoProps {
  latitude: number
  longitude: number
  minWindspeed?: number
  viableDirections?: { [key: string]: number }
}

export default function RenderingInfo({
  latitude,
  longitude,
  minWindspeed = 0,
  viableDirections = {},
}: RenderingInfoProps) {
  const {
    weatherData,
    loadingForecast,
    loadingObservation,
    loadingForecastGrid,
    errorForecast,
    errorObservation,
    errorForecastGrid,
  } = useWeather({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
  })
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<string>("all")

  const suitablePeriods = useMemo(() => {
    if (weatherData) {
      return weatherData.properties.periods.filter((period: any) => {
        const windSpeedMatch = period.windSpeed
          .split(" ")
          .some((speed: string) => {
            const parsedSpeed = parseInt(speed)
            return !isNaN(parsedSpeed) && parsedSpeed >= minWindspeed
          })

        const windDirection = period.windDirection?.toUpperCase()
        const windDirectionMatch = windDirection
          ? viableDirections[windDirection] === 1
          : false

        return windSpeedMatch && windDirectionMatch
      })
    }
    return []
  }, [weatherData, minWindspeed, viableDirections])

  if (loadingForecast || loadingObservation || loadingForecastGrid) {
    return (
      <div className="text-center text-gray-700">Loading weather data...</div>
    )
  }

  if (errorForecast || errorObservation || errorForecastGrid) {
    return (
      <div className="text-center text-red-500">
        {errorForecast && <p>Error fetching forecast: {errorForecast}</p>}
        {errorObservation && (
          <p>Error fetching observation: {errorObservation}</p>
        )}
        {errorForecastGrid && (
          <p>Error fetching forecast grid data: {errorForecastGrid}</p>
        )}
      </div>
    )
  }

  if (!weatherData) {
    return <div className="text-center text-gray-500">No data available</div>
  }

  const handlePeriodSelect = (periodNumber: number) => {
    setSelectedPeriod(periodNumber)
  }

  const formatDate = (dateString: string) => {
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

  const periodsToShow =
    viewMode === "all" ? weatherData.properties.periods : suitablePeriods

  return (
    <div className="space-y-3 rounded-lg bg-gray-800 p-4 m-2 text-gray-200 font-mono shadow-lg">
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="viewMode"
          name="viewMode"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
        >
          <FormControlLabel
            value="all"
            control={<Radio color="primary" />}
            label="All Periods"
          />
          <FormControlLabel
            value="suitable"
            control={<Radio color="primary" />}
            label="Suitable Periods"
          />
        </RadioGroup>
      </FormControl>
      <div className="text-sm text-gray-300">
        {periodsToShow.length === 0 ? (
          <div>No periods found</div>
        ) : (
          periodsToShow.map((period: any) => (
            <div
              key={period.number}
              className={`p-2 cursor-pointer ${
                selectedPeriod === period.number ? "bg-gray-700" : "bg-gray-800"
              } ${
                suitablePeriods.includes(period)
                  ? "border-l-4 border-green-500"
                  : ""
              }`}
              onClick={() => handlePeriodSelect(period.number)}
            >
              <div>
                <strong>{formatDate(period.startTime)}</strong>:{" "}
                {period.shortForecast}
              </div>
              {selectedPeriod === period.number && (
                <div className="mt-2 space-y-2">
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
                    <strong>Humidity:</strong> {period?.relativeHumidity?.value}
                    %
                  </div>
                  <div>
                    <strong>Probability of Precipitation:</strong>{" "}
                    {period.probabilityOfPrecipitation?.value}%
                  </div>
                  <div>
                    <strong>Forecast:</strong> {period.detailedForecast}
                  </div>
                  <div>
                    <strong>Full Data:</strong>
                    <div className="bg-gray-700 p-2 rounded">
                      <div>
                        <strong>Number:</strong> {period.number}
                      </div>
                      <div>
                        <strong>Name:</strong> {period.name}
                      </div>
                      <div>
                        <strong>Start Time:</strong> {period.startTime}
                      </div>
                      <div>
                        <strong>End Time:</strong> {period.endTime}
                      </div>
                      <div>
                        <strong>Is Daytime:</strong>{" "}
                        {period.isDaytime ? "Yes" : "No"}
                      </div>
                      <div>
                        <strong>Temperature:</strong> {period.temperature}{" "}
                        {period.temperatureUnit}
                      </div>
                      <div>
                        <strong>Temperature Trend:</strong>{" "}
                        {period.temperatureTrend || "N/A"}
                      </div>
                      <div>
                        <strong>Probability of Precipitation:</strong>{" "}
                        {period.probabilityOfPrecipitation?.value}%
                      </div>
                      <div>
                        <strong>Wind Speed:</strong> {period.windSpeed}
                      </div>
                      <div>
                        <strong>Wind Direction:</strong> {period.windDirection}
                      </div>
                      <div>
                        <strong>Icon:</strong>{" "}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={period.icon} alt="Weather Icon" />
                      </div>
                      <div>
                        <strong>Short Forecast:</strong> {period.shortForecast}
                      </div>
                      <div>
                        <strong>Detailed Forecast:</strong>{" "}
                        {period.detailedForecast}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
