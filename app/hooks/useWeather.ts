import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';
import { Key, ReactNode } from 'react';

/**
 * Interface representing the query parameters for fetching weather data.
 */
export interface GetWeatherQuery {
  latitude: string;
  longitude: string;
}

/**
 * Interface representing the structure of the weather data returned by the API.
 */
export interface WeatherData {
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
  observationStations: string;
  radarStation: string;
}

/**
 * Fetches the forecast office information from the Weather API.
 *
 * @param {string} latitude - The latitude coordinate.
 * @param {string} longitude - The longitude coordinate.
 * @returns {Promise<object>} The URLs of the relevant endpoints.
 * @throws Will throw an error if the request fails.
 */
const getForecastUrls = async (latitude: string, longitude: string): Promise<{ forecast: string, observationStations: string, radarStation: string }> => {
  const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
  if (!response.ok) {
    throw new Error('Error fetching forecast office information');
  }
  const data = await response.json();
  return {
    forecast: data.properties.forecast,
    observationStations: data.properties.observationStations,
    radarStation: data.properties.radarStation,
  };
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
 * Fetches additional data from observation stations and radar station.
 *
 * @param {string} observationStationsUrl - The URL of the observation stations endpoint.
 * @param {string} radarStationUrl - The URL of the radar station endpoint.
 * @returns {Promise<{ observationData: any; radarData: any }>} The additional data fetched from the API.
 * @throws Will throw an error if the request fails.
 */
const getAdditionalData = async (observationStationsUrl: string, radarStationUrl: string): Promise<{ observationData: any; radarData: any }> => {
  const observationResponse = await fetch(observationStationsUrl);
  if (!observationResponse.ok) {
    throw new Error('Error fetching observation stations data');
  }
  const observationData = await observationResponse.json();

  const radarResponse = await fetch(radarStationUrl);
  if (!radarResponse.ok) {
    throw new Error('Error fetching radar data');
  }
  const radarData = await radarResponse.json();

  return { observationData, radarData };
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
        const { forecast, observationStations, radarStation } = await getForecastUrls(debouncedLatitude, debouncedLongitude);
        const data = await getWeatherData(forecast);
        const additionalData = await getAdditionalData(observationStations, radarStation);
        setWeatherData({ ...data, ...additionalData });
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
