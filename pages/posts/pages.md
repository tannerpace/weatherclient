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

My initial structure was to fetch the location information from my server this included the viable wind directions for a location as well as the lat and long. Then I would use the lat and long to fetch the weather information from the NOAA API. This would allow me to get the wind speed and direction for the location. I would then use the wind speed and direction to determine if the location was viable for kitesurfing. This would allow me to display the location on the map and show the user if the location was viable for kitesurfing.

```
{"error":windspeed is undefined}
```

The logic for determining viable locations was tightly coupled to the rendering. At the time I was using react, with [**react-query**](https://react-query.tanstack.com/) library to fetch the weather on the client side. Tight coupling such as this is a problem because it makes the code difficult to test. It also makes it difficult to change the logic for determining viable locations. I had to change the structure of the page to fetch the data on the server side. This would allow the page to build and load faster.

## Problem 2: API is slow

```
{
  "status": "504",
  "title": "Gateway Timeout",
  "detail": "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI or some other auxiliary server (e.g. DNS) it needed to access in attempting to complete the request."
}
```

The NOAA API is slow. It takes a long time to fetch the weather information. This is a problem because it makes the page load slowly. I had to change the structure of the page to fetch the data on the server side. This would allow the page to build and load faster.

## Problem 3: API is unreliable

```
{
  "status": "503",
  "title": "Service Unavailable",
  "detail": "The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay. The server MAY send a Retry-After header field to suggest an appropriate amount of time for the client to wait before retrying the request."
}
```

The NOAA API is unreliable. It is down frequently. This is a problem because with out the weather information the page is useless. I intend to update the component to fetch the weather information from the NOAA API on the client side. If it is not included in the initial page load the user can fetch the weather information by clicking a button. This will allow the page to load faster and will allow the user to fetch the weather information if they want it.

## Conclusion

Working with unreliable APIs is a problem. I had to change the structure of the page to fetch the data on the server side. This would allow the page to build and load faster. I intend to update the component to fetch the weather information from the NOAA API on the client side. If it is not included in the initial page load the user can fetch the weather information by clicking a button. This will allow the page to load faster and will allow the user to fetch the weather information if they want it.

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
