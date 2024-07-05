import React from "react"
import { useRouter } from "next/router"
import Image from "next/image" // Import Image from next/image
import useKiteSurfSpots from "../hooks/useKiteSurfSpots" // Adjust the import path
import useWeather from "@/app/hooks/useWeather"

const Page: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: kitesurfSpots = [] } = useKiteSurfSpots()

  const spot = kitesurfSpots.find((s) => s.id === Number(id))

  const {
    data: weatherData,
    isLoading,
    error,
  } = useWeather({
    latitude: spot?.latitude.toString() || "",
    longitude: spot?.longitude.toString() || "",
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
        {isLoading && <p>Loading weather data...</p>}
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

export default Page
