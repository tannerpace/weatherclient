import { useState, useEffect } from 'react';
import locations, { ActivitySpot } from '../api/mock';


const initialLocations: ActivitySpot[] = locations.map((location) => ({
  ...location,
  latitude: parseFloat(location.latitude),
  longitude: parseFloat(location.longitude),
}));


const fetchKitesurfSpots = async (): Promise<ActivitySpot[]> => {
  const userLocations = JSON.parse(localStorage.getItem("userLocations") || "[]");
  return [...initialLocations, ...userLocations];
};


const useKiteSurfSpots = () => {
  const [data, setData] = useState<ActivitySpot[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getKitesurfSpots = async () => {
      try {
        const spots = await fetchKitesurfSpots();
        setData(spots);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getKitesurfSpots();
  }, []);

  return { data, isLoading, error };
};


const fetchUserLocations = async (): Promise<ActivitySpot[]> => {
  const userLocations = JSON.parse(localStorage.getItem("userLocations") || "[]");
  return userLocations.map((location: any) => ({
    ...location,
    latitude: parseFloat(location.latitude),
    longitude: parseFloat(location.longitude),
  }));
};


const useUserLocations = () => {
  const [data, setData] = useState<ActivitySpot[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getUserLocations = async () => {
      try {
        const userLocations = await fetchUserLocations();
        setData(userLocations);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getUserLocations();
  }, []);


  const setUserLocations = (newLocations: ActivitySpot[]) => {
    localStorage.setItem("userLocations", JSON.stringify(newLocations));
    setData(newLocations);
  };

  return { data, isLoading, error, setUserLocations };
};

export { useKiteSurfSpots, useUserLocations };
