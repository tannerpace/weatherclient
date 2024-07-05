import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from './useDebounce';
import WeatherService from '../api/weatherService';
import { Key, ReactNode } from 'react';

/**
 * Interface representing the query parameters for fetching weather data.
 */
interface GetWeatherQuery {
  latitude: string;
  longitude: string;
}

/**
 * Interface representing the structure of the weather data returned by the API.
 */
interface WeatherData {
  properties: {
    periods: Array<{
      windSpeed: ReactNode;
      windDirection: ReactNode;
      temperature: ReactNode;
      startTime: ReactNode;
      shortForecast: ReactNode;
      number: Key | null | undefined;
      relativeHumidity: any;
      detailedForecast: string;
    }>;
  };
}

/**
 * Fetches weather data from the WeatherService API.
 *
 * @param {string} latitude - The latitude coordinate.
 * @param {string} longitude - The longitude coordinate.
 * @returns {Promise<WeatherData>} The weather data fetched from the API.
 * @throws Will throw an error if the request fails.
 */
const getWeatherData = async (latitude: string, longitude: string): Promise<WeatherData> => {
  try {
    const response = await WeatherService.get(`/points/${latitude},${longitude}/forecast`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Custom hook to get weather data using react-query and debounced coordinates.
 *
 * @param {GetWeatherQuery} data - The query parameters containing latitude and longitude.
 * @returns {Object} The result of the useQuery hook, including status and data.
 */
const useWeather = (data: GetWeatherQuery) => {
  const queryClient = useQueryClient();
  const debouncedLatitude = useDebounce(data.latitude, 800);
  const debouncedLongitude = useDebounce(data.longitude, 800);

  return useQuery({
    queryKey: ['weather', debouncedLatitude, debouncedLongitude],
    queryFn: () => getWeatherData(debouncedLatitude, debouncedLongitude),
    enabled: !!debouncedLatitude && !!debouncedLongitude,
  });
};

export default useWeather;
