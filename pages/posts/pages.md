---
title: Working with unreliable APIs
date: 2021/3/18
description: How to work with unreliable APIs
tag: web development
author: Tanner Bleakley
---

# Working with unreliable APIs

While building [**Kitesurf.ninja**](https://ninja-iota.vercel.app/) I ran into a few unanticipated problems with the [NOAA Weather Api](https://www.weather.gov/documentation/services-web-api). I will go over the problems I had and how I solved them.

## Problem 1: API is down

```
{
  "status": "500",
  "title": "Internal Server Error",
  "detail": "An error occurred while processing the request. Please try again."
}
```

My initial structure was to fetch the location information from my server this included the viable wind directions for a location as well as the lat and long. I would use the lat and long to fetch the weather data. I would then use the wind speed and direction to determine if the location was viable for kitesurfing. This would allow me to display the location on the map and show the user if the location was viable for kitesurfing.

The logic for determining viable locations was tightly coupled to the rendering. At the time I was using react, with [**react-query**](https://react-query.tanstack.com/) library to fetch the weather on the client side. Tight coupling such as this is a problem because it makes the code difficult to test. It also makes it difficult to change the logic for determining viable locations. I had to change the structure of my api to fetch the data on the server side. This would allow the page to build and load faster.

## Problem 2: API is slow

```
{
  "status": "504",
  "title": "Gateway Timeout",
  "detail": "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI or some other auxiliary server (e.g. DNS) it needed to access in attempting to complete the request."
}
```

The NOAA API is slow, and my users had to wait for not just the weather data but also the location data. This was a noticeable delay. Changing the structure of the api to fetch the data on the server side would allow the page to build and load faster.

## Problem 3: API is unreliable

```
{
  "status": "503",
  "title": "Service Unavailable",
  "detail": "The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay. The server MAY send a Retry-After header field to suggest an appropriate amount of time for the client to wait before retrying the request."
}
```

## Problem 4: API sends data that is not usable

The weather data from the goverment weather API is not in a standard format. The wind direction is a string, and the wind speed is a string. I had to convert the wind direction to a degree.

```
{"windDirection": "N",}

```

It wasn't clever but it worked.

```


export default function useWindDirectionToNumber(direction) {
  let result = 0
  switch (direction) {
    case "N":
      result = 0
      break
    case "NNE":
      result = 22.5
      break
    case "NE":
      result = 45
      break
    case "ENE":
      result = 67.5
      break
    case "E":
      result = 90
      break
    case "ESE":
      result = 112.5
      break
    case "SE":
      result = 135
      break
    case "SSE":
      result = 157.5
      break
    case "S":
      result = 180
      break
    case "SSW":
      result = 202.5
      break
    case "SW":
      result = 225
      break
    case "WSW":
      result = 247.5
      break
    case "W":
      result = 270
      break
    case "WNW":
      result = 292.5
      break
    case "NW":
      result = 315
      break
    case "NNW":
      result = 337.5
      break
    default:
      result = 0
  }
  return { result }
}


```

## Problem 5: API sends windspeed as a string

```
{
  "windSpeed": "15 mph",
}
```

I had to convert the wind speed to a number.
I also had to determine if the number was greater than 10 because when converting the string to a number it would return 15.0. I had to convert the number to a string and then check the length of the string.

```
export default function useWindSpeedToNumber(speed) {
  let result = 0
  if (speed) {
    result = Number(speed.split(" ")[0])
    if (result > 10) {
      result = result.toFixed(0)
    }
  }
  return { result }
}
```

```

## Conclusion

Working with unreliable APIs is a problem, that you have to design around. I intend to update the component to fetch the weather information from the NOAA API on the client side, only as a backup if it is not included in the initial page data. This will allow the page to load and will allow the user to see if the location is viable for kitesurfing. Even if the NOAA API errors on the request from my server.



## Resources

- [**Kitesurf.ninja**](https://ninja-iota.vercel.app/)

- [**NOAA Weather Api**](https://www.weather.gov/documentation/services-web-api)

- [**react-query**](https://react-query.tanstack.com/)

- [**Vercel**](https://vercel.com/)

- [**Next.js**](https://nextjs.org/)

- [**React**](https://reactjs.org/)

- [**Node.js**](https://nodejs.org/en/)

- [**Express**](https://expressjs.com/)

- [**MySQL**](https://www.mysql.com/)

- [**Postman**](https://www.postman.com/)

```

```

```
