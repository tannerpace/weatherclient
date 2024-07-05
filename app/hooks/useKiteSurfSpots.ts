import { useQuery } from "@tanstack/react-query";
import locations, { KitesurfSpot } from "../api/mock";

const initialLocations: KitesurfSpot[] = locations.map((location) => ({
  ...location,
  latitude: parseFloat(location.latitude),
  longitude: parseFloat(location.longitude),
}));

const fetchKitesurfSpots = async (): Promise<KitesurfSpot[]> => {
  return initialLocations;
};

const useKiteSurfSpots = () => {
  return useQuery<KitesurfSpot[], Error>({
    queryKey: ["kitesurfSpots"],
    queryFn: fetchKitesurfSpots,
  });
};

export default useKiteSurfSpots;
