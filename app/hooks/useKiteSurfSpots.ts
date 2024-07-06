import { useState, useEffect } from 'react';
import locations, { KitesurfSpot } from '../api/mock';

const initialLocations: KitesurfSpot[] = locations.map((location) => ({
  ...location,
  latitude: parseFloat(location.latitude),
  longitude: parseFloat(location.longitude),
}));

const fetchKitesurfSpots = async (): Promise<KitesurfSpot[]> => {
  const userLocations = JSON.parse(localStorage.getItem("userLocations") || "[]");
  return [...initialLocations, ...userLocations];
};

const useKiteSurfSpots = () => {
  const [data, setData] = useState<KitesurfSpot[]>();
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

export default useKiteSurfSpots;
