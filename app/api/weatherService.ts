import { CreateService } from '@/app/api/Service'

const weatherServiceConfig = {
  baseURL: 'https://api.weather.gov',
  headers: {
    'User-Agent': 'http://kitesurf.ninja',
    'Accept': 'application/cap+xml',
    'content-type': 'application/json',
    'contact-email': 'newtanner29@gmail.com'
  }
};

const WeatherService = CreateService(weatherServiceConfig);
export default WeatherService