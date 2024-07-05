import { useRouter } from "next/router"

import Image from "next/image"
import useKiteSurfSpots from "../hooks/useKiteSurfSpots"
import useWeather from "../hooks/useWeather"

const SpotPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: kitesurfSpots = [] } = useKiteSurfSpots()

  // Ensure spot is defined before using its properties
  const spot = kitesurfSpots.find((s) => s.id === Number(id))

  // Fetch weather data based on spot's location
  const {
    data: weatherData,
    isLoading,
    error,
  } = useWeather({
    latitude: spot?.latitude?.toString() || "",
    longitude: spot?.longitude?.toString() || "",
  })

  if (!spot) {
    return <div>Spot not found</div>
  }

  return (
    <div>
      <h1>{spot.name}</h1>
      {spot.location_img_url && (
        <Image
          src={spot.location_img_url}
          alt={spot.name}
          width={800}
          height={600}
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />
      )}
      <p>{spot.description}</p>
      <div>Wind Direction: {spot.winddirections}</div>
      <div>
        <h2>Weather Forecast</h2>
        {error && <p>Error loading weather data</p>}
        {weatherData && (
          <div>
            {weatherData.properties.periods.map((period, index) => (
              <p key={index}>{period.detailedForecast}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SpotPage
