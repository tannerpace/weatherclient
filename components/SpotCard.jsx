import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "@/app/hooks/useDebounce"
import SpotMap from "./SpotMap"
import WindDial from "./WindDial"
import { Typography, Stack } from "@mui/material"
import WeatherService from "../api/weatherService"

// Custom hook to get weather data using react-query and debounced coordinates
const useGetWeather = (data) => {
  const debouncedLatitude = useDebounce(data.latitude, 800)
  const debouncedLongitude = useDebounce(data.longitude, 800)

  const query = useQuery({
    queryKey: ["weather", debouncedLatitude, debouncedLongitude],
    queryFn: () => getWeatherData(debouncedLatitude, debouncedLongitude),
    enabled: !!debouncedLatitude && !!debouncedLongitude,
  })

  return query
}

// Function to fetch weather data
const getWeatherData = async (latitude, longitude) => {
  try {
    const response = await WeatherService.get(
      `/points/${latitude},${longitude}/forecast`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw error
  }
}

// KitesurfSpotCard component
const KitesurfSpotCard = ({ spot }) => {
  const { data, status } = useGetWeather({
    latitude: spot.latitude,
    longitude: spot.longitude,
  })

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-lg mb-4">
      <Typography variant="h5" component="h2" className="mb-2">
        {spot.name}
      </Typography>
      <Typography variant="body1" color="textSecondary" className="mb-2">
        {spot.description}
      </Typography>
      <Typography variant="body2" color="textSecondary" className="mb-2">
        Experience: {spot.experience}
      </Typography>
      <Typography variant="body2" color="textSecondary" className="mb-2">
        Wind Directions: {spot.winddirections}
      </Typography>
      <Typography variant="body2" color="textSecondary" className="mb-2">
        Depth: {spot.depth}
      </Typography>
      <Typography variant="body2" color="textSecondary" className="mb-4">
        Waves: {spot.waves}
      </Typography>
      <SpotMap
        location={spot}
        goodPeriodsCount={0}
        percentageOfGoodPeriods={0}
      />
      <Stack direction="row" spacing={1} mt={2}>
        {Object.keys(spot.viable_directions).map((dir) => (
          <WindDial
            key={dir}
            windDirection={dir}
            viableDirections={Object.keys(spot.viable_directions).filter(
              (d) => spot.viable_directions[d]
            )}
          />
        ))}
      </Stack>
      {status === "loading" ? (
        <Typography variant="body2" color="textSecondary" className="mt-4">
          Loading weather data...
        </Typography>
      ) : status === "error" ? (
        <Typography variant="body2" color="error" className="mt-4">
          Error fetching weather data.
        </Typography>
      ) : (
        <Typography variant="body2" color="textSecondary" className="mt-4">
          Weather Forecast: {data.properties.periods[0].detailedForecast}
        </Typography>
      )}
    </div>
  )
}

export default KitesurfSpotCard
