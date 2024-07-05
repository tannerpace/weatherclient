import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';
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
 * Fetches the forecast office information from the Weather API.
 *
 * @param {string} latitude - The latitude coordinate.
 * @param {string} longitude - The longitude coordinate.
 * @returns {Promise<string>} The URL of the forecast endpoint.
 * @throws Will throw an error if the request fails.
 */
const getForecastUrl = async (latitude: string, longitude: string): Promise<string> => {
  const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
  if (!response.ok) {
    throw new Error('Error fetching forecast office information');
  }
  const data = await response.json();
  return data.properties.forecast;
};

/**
 * Fetches weather data from the API.
 *
 * @param {string} forecastUrl - The URL of the forecast endpoint.
 * @returns {Promise<WeatherData>} The weather data fetched from the API.
 * @throws Will throw an error if the request fails.
 */
const getWeatherData = async (forecastUrl: string): Promise<WeatherData> => {
  const response = await fetch(forecastUrl);
  if (!response.ok) {
    throw new Error('Error fetching weather data');
  }
  return response.json();
};

/**
 * Custom hook to get weather data using fetch and debounced coordinates.
 *
 * @param {GetWeatherQuery} data - The query parameters containing latitude and longitude.
 * @returns {Object} The state of the weather data fetching process, including status and data.
 */
const useWeather = (data: GetWeatherQuery) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedLatitude = useDebounce(data.latitude, 800);
  const debouncedLongitude = useDebounce(data.longitude, 800);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!debouncedLatitude || !debouncedLongitude) return;
      setLoading(true);
      setError(null);
      try {
        const forecastUrl = await getForecastUrl(debouncedLatitude, debouncedLongitude);
        const data = await getWeatherData(forecastUrl);
        setWeatherData(data);
      } catch (err) {
        //@ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [debouncedLatitude, debouncedLongitude]);

  return { weatherData, loading, error };
};

export default useWeather;
