---
title: Working with unreliable APIs
date: 2021/3/18
description: How to work with unreliable APIs
tag: web development
author: Tanner Bleakley
---

# Working with unreliable APIs

While building [**Kitesurf.ninja**](https://ninja-iota.vercel.app/) I ran into a few unanticipated problems with the [NOAA Weather Api](https://www.weather.gov/documentation/services-web-api).

My initial structure was to fetch the viable wind directions for a location as well as the lat and long, I would use the lat and long to fetch the weather data. This would allow me to display the location on the map and show the user if the location was viable for kitesurfing.

## Problem 1: API is down

```
{
  "status": "500",
  "title": "Internal Server Error",
  "detail": "An error occurred while processing the request. Please try again."
}
```

The logic for determining viable locations was tightly coupled to the rendering. At the time I was using react, with [**react-query**](https://react-query.tanstack.com/) library to fetch the weather on the client side. Tight coupling such as this is a problem because it makes the code difficult to test. It also makes it difficult to read the logic. I moved as much business logic out of the components and onto the server.

## Problem 2: API is slow

```
{
  "status": "504",
  "title": "Gateway Timeout",
  "detail": "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI or some other auxiliary server (e.g. DNS) it needed to access in attempting to complete the request."
}
```

The NOAA API is slow, and my users had to wait for not just the weather data but also the location data. This was a noticeable delay.By having my server request weather data from NOAA I could reduce time users had to wait, this would help seo and user experience.

## Problem 3: API sends data that is not usable

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

## Problem 4: API sends windspeed as a string

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

This works, because for my use windspeed below 10mph are not viable, in the future I will have a user defined variable and may revisit this solution.

## Conclusion

Working with unreliable APIs is a problem, that you have to design around. I could have easily switched to a different API, but I wanted to use the NOAA API because it was free. I also enjoyed the challenge of working with an API that I didn't control. I learned a lot about how to work with APIs. I also learned a lot about how to design an API that is reliable and easy to work with.

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

```
