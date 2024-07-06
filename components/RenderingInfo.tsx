import useWeather from "@/app/hooks/useWeather"
import React, { useState, useMemo } from "react"
import { FormControl, FormControlLabel, RadioGroup, Radio } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTemperatureHigh,
  faWind,
  faTint,
} from "@fortawesome/free-solid-svg-icons"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

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
  const { weatherData, error } = useWeather({
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

  if (error) {
    return <div className="text-red-500">Error fetching weather data</div>
  }

  if (!weatherData) {
    return <div className="text-gray-500">No data available</div>
  }

  const chartData = {
    labels: periodsToShow.map((period: any) => formatDate(period.startTime)),
    datasets: [
      {
        label: "Wind Speed (mph)",
        data: periodsToShow.map((period: any) =>
          parseInt(period.windSpeed.split(" ")[0])
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Wind Speed Over Time",
      },
    },
  }

  return (
    <div className="space-y-4 bg-black bg-opacity-40 p-4 m-2 rounded-lg text-green-300">
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
      <div className="text-sm text-green-500">
        {periodsToShow.length === 0 ? (
          <div className="text-gray-500">No periods found</div>
        ) : (
          <>
            <Line data={chartData} options={chartOptions} />
            {periodsToShow.map((period: any) => (
              <div
                key={period.number}
                className={`p-3 mb-2 cursor-pointer rounded-md transition-colors duration-300 ${
                  selectedPeriod === period.number
                    ? "bg-black bg-opacity-90"
                    : "bg-black bg-opacity-60"
                } ${
                  suitablePeriods.includes(period)
                    ? "border-l-4 border-green-500"
                    : ""
                }`}
                onClick={() => handlePeriodSelect(period.number)}
              >
                <div className="font-semibold text-lime-900">
                  {formatDate(period.startTime)}: {period.shortForecast}
                </div>
                {selectedPeriod === period.number && (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-lime-500">
                      <FontAwesomeIcon
                        icon={faTemperatureHigh}
                        className="mr-2"
                      />
                      <strong className="text-lime-700">Temperature:</strong>{" "}
                      {period.temperature} {period.temperatureUnit}
                    </div>
                    <div className="flex items-center text-lime-500">
                      <FontAwesomeIcon icon={faWind} className="mr-2" />
                      <strong className="text-lime-700">Wind:</strong>{" "}
                      {period.windSpeed} {period.windDirection}
                    </div>
                    <div className="flex items-center text-lime-500">
                      <FontAwesomeIcon icon={faTint} className="mr-2" />
                      <strong className="text-lime-700">Humidity:</strong>{" "}
                      {period?.relativeHumidity?.value}%
                    </div>
                    <div className="flex items-center text-lime-500 bg-black bg-opacity-40">
                      <strong className="text-lime-700">
                        Precipitation Probability:
                      </strong>{" "}
                      {period.probabilityOfPrecipitation?.value}%
                    </div>
                    <div className="flex items-center text-lime-500">
                      <strong className="text-lime-700">Forecast:</strong>{" "}
                      {period.detailedForecast}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
