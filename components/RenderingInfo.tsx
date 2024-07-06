import useWeather from "@/app/hooks/useWeather"
import React, { useState, useMemo } from "react"
import { FormControl, FormControlLabel, RadioGroup, Radio } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTemperatureHigh,
  faWind,
  faTint,
} from "@fortawesome/free-solid-svg-icons"
import {
  Line,
  Bar,
  Radar,
  Doughnut,
  PolarArea,
  Bubble,
  Pie,
  Scatter,
} from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
)

interface Period {
  number: number
  name: string
  startTime: string
  endTime: string
  isDaytime: boolean
  temperature: number
  temperatureUnit: string
  temperatureTrend: string
  probabilityOfPrecipitation: {
    unitCode: string
    value: number | null
  }
  windSpeed: string
  windDirection: string
  icon: string
  shortForecast: string
  detailedForecast: string
}

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
  const [dataType, setDataType] = useState<string>("windspeed")
  const [chartType, setChartType] = useState<string>("line")

  const suitablePeriods = useMemo(() => {
    if (weatherData && weatherData.properties) {
      return (weatherData.properties.periods as Period[]).filter(
        (period: Period) => {
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
        }
      )
    }
    return []
  }, [weatherData, minWindspeed, viableDirections])

  const periodsToShow: Period[] =
    viewMode === "all"
      ? (weatherData?.properties?.periods as Period[]) || []
      : suitablePeriods

  const handlePeriodSelect = (index: number) => {
    const selected = periodsToShow[index]
    if (selected) {
      setSelectedPeriod(selected.number)
    } else {
      setSelectedPeriod(null)
    }
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

  if (error) {
    return <div className="text-red-500">Error fetching weather data</div>
  }

  if (!weatherData) {
    return <div className="text-gray-500">No data available</div>
  }

  const chartData = {
    labels: periodsToShow.map((period: Period) => formatDate(period.startTime)),
    datasets: [
      {
        label:
          dataType === "windspeed"
            ? "Wind Speed (mph)"
            : dataType === "temperature"
            ? "Temperature (°F)"
            : "Precipitation Probability (%)",
        data: periodsToShow.map((period: Period) =>
          dataType === "windspeed"
            ? parseInt(period.windSpeed.split(" ")[0])
            : dataType === "temperature"
            ? period.temperature
            : period.probabilityOfPrecipitation?.value
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  }

  const chartOptions: ChartOptions<any> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          dataType === "windspeed"
            ? "Wind Speed Over Time"
            : dataType === "temperature"
            ? "Temperature Over Time"
            : "Precipitation Probability Over Time",
      },
    },
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const index = elements[0].index
        handlePeriodSelect(index)
      }
    },
  }

  const ChartComponent = {
    line: Line,
    bar: Bar,
    radar: Radar,
    doughnut: Doughnut,
    polarArea: PolarArea,
    bubble: Bubble,
    pie: Pie,
    scatter: Scatter,
  }[chartType] as unknown as React.ElementType

  return (
    <div className="space-y-4 bg-black bg-opacity-40 p-4 m-2 rounded-lg text-green-300">
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="dataType"
          name="dataType"
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          <FormControlLabel
            value="windspeed"
            control={<Radio color="primary" />}
            label="Wind Speed"
          />
          <FormControlLabel
            value="temperature"
            control={<Radio color="primary" />}
            label="Temperature"
          />
          <FormControlLabel
            value="precipitation"
            control={<Radio color="primary" />}
            label="Precipitation"
          />
        </RadioGroup>
        <RadioGroup
          row
          aria-label="chartType"
          name="chartType"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <FormControlLabel
            value="line"
            control={<Radio color="primary" />}
            label="Line"
          />
          <FormControlLabel
            value="bar"
            control={<Radio color="primary" />}
            label="Bar"
          />
          <FormControlLabel
            value="radar"
            control={<Radio color="primary" />}
            label="Radar"
          />
          <FormControlLabel
            value="doughnut"
            control={<Radio color="primary" />}
            label="Doughnut"
          />
          <FormControlLabel
            value="polarArea"
            control={<Radio color="primary" />}
            label="Polar Area"
          />
          <FormControlLabel
            value="bubble"
            control={<Radio color="primary" />}
            label="Bubble"
          />
          <FormControlLabel
            value="pie"
            control={<Radio color="primary" />}
            label="Pie"
          />
          <FormControlLabel
            value="scatter"
            control={<Radio color="primary" />}
            label="Scatter"
          />
        </RadioGroup>
      </FormControl>
      <div className="text-sm text-green-500">
        {periodsToShow.length === 0 ? (
          <div className="text-gray-500">No periods found</div>
        ) : (
          <>
            <ChartComponent data={chartData} options={chartOptions} />
            {periodsToShow.map((period: Period, index: number) => (
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
                onClick={() => handlePeriodSelect(index)}
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
