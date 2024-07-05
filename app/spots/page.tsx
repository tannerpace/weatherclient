"use client"
import useWeather from "../hooks/useWeather"

const latitude = "32.78621094914123"
const longitude = "-79.9387649781444"

export default function Page() {
  const { data, isLoading, error } = useWeather({ latitude, longitude })

  return (
    <div className="prose prose-sm prose-invert max-w-none">
      <h1 className="text-xl font-bold">Kitesurf Ninja</h1>

      <ul>
        <li>
          Kitesurf Ninja helps kiteboarders find the best times to kiteboard.
        </li>
        <li>
          We provide up-to-date weather information for optimal kiteboarding
          conditions.
        </li>
        <li>
          Check the weather forecast below to plan your next kiteboarding
          session.
        </li>
      </ul>
      <div className="weather mt-4">
        <h2 className="text-lg font-bold">Current Weather in Charleston</h2>
        {isLoading && <p>Loading weather data...</p>}
        {error && <p>Error fetching weather data: {error.message}</p>}
        {data && (
          <div className="weather-data">
            <p>
              Detailed Forecast: {data.properties.periods[0].detailedForecast}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
