interface WeatherPeriod {
  number: number
  startTime: string
  endTime: string
  isDaytime: boolean
  temperature: number
  temperatureUnit: string
  temperatureTrend: string | null
  probabilityOfPrecipitation: {
    unitCode: string
    value: number
  }
  dewpoint: {
    unitCode: string
    value: number
  }
  relativeHumidity: {
    unitCode: string
    value: number
  }
  windSpeed: string
  windDirection: string
  icon: string
  shortForecast: string
  detailedForecast: string
}

interface WeatherProps {
  latitude: string
  longitude: string
}



