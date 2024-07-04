// api.js
const axios = require('axios');
const config = {
  headers: {
    token: process.env.NOAA_TOKEN,
  },
};
const weatherConfig = {
  headers: {
    'User-Agent': 'http://kitesurf.ninja',
    'Accept': 'application/cap+xml',
    'content-type': 'application/json',
    'contact-email': 'newtanner29@gmail.com'
  },
}


interface Station {
  latitude: number;
  longitude: number;
  tidePredictionUrl: string;
  [key: string]: any; // Additional properties if any
}
const extractNumberFromId = (id) => {
  if (!id || typeof id !== "string") {
    console.error("Invalid ID");
    return null;
  }
  const parts = id.split(":");
  if (parts.length !== 2 || Number.isNaN(parts[1])) {
    console.error("Invalid ID format");
    return null;
  }
  const foundId = parts[1];
  console.log("foundId", foundId);
  return foundId;
};

const haversineDistance = (coords1: { lat: any; lng: any; }, coords2: { latitude: any; longitude: any; }) => {
  const toRadian = (angle: number) => (Math.PI / 180) * angle;
  const distance = (a: number, b: number) => (Math.PI / 180) * (b - a);
  const RADIUS_OF_EARTH_IN_KM = 6371;

  const dLat = distance(coords1.lat, coords2.latitude);
  const dLon = distance(coords1.lng, coords2.longitude);

  const lat1 = toRadian(coords1.lat);
  const lat2 = toRadian(coords2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return RADIUS_OF_EARTH_IN_KM * c;
};

const findClosestStation = async (stations: any, lat: any, lng: any) => {
  try {
    let closestStation = null;
    let minDistance = Number.POSITIVE_INFINITY;
    for (const station of stations) {
      const distance = haversineDistance(
        { lat, lng },
        { latitude: station.latitude, longitude: station.longitude },
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestStation = station;
      }
    }

    if (closestStation) {
      console.log("Found Closest Station:", closestStation);
      return closestStation;
    }
    return null;
  } catch (e) {
    console.error("Error finding the closest station: ", e);
    return null;
  }
};

const getWeatherDataFromUrl = async (url: any) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    const err = error as any; // or more specific type if known
    console.error('Error fetching weather data:', err.message);
    return null;
  }
};

const getWeather = async (lat, long) => {
  try {
    const tideStations = fetchTidePredictionLink(); // Implement this function as needed
    const stations = await getAllStations(); // Implement this function as needed
    const address = await reverseGeoCode(lat, long); // Implement this function as needed
    const closestStation = await findClosestStation(tideStations, lat, long);

    if (!closestStation) {
      throw new Error('No closest station found');
    }

    const tideHtml = await getWeatherDataFromUrl(closestStation.tidePredictionUrl);
    const tideLink = await fetchTidePredictionLink(tideHtml); // Implement this function as needed
    const tideResponse = await getWeatherDataFromUrl(tideLink);
    console.log("TIDE RESPONSE", tideResponse);

    return { tideResponse };
  } catch (error) {
    const err = error as any; // or more specific type if known
    console.log(err);
    return { weather: null, hourlyWeather: null };
  }
};

module.exports = {
  getWeather,
  findClosestStation,
  getWeatherDataFromUrl,
  haversineDistance,
  extractNumberFromId
};

function fetchTidePredictionLink(tideHtml: any) {
  throw new Error("Function not implemented.");
}

function getAllStations() {
  throw new Error("Function not implemented.");
}

function reverseGeoCode(lat: any, long: any) {
  throw new Error("Function not implemented.");
}
