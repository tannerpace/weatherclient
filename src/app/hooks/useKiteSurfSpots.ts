import { useQuery } from "@tanstack/react-query";
import locations from "../../../mock";
import { KitesurfSpot } from "../components/Map";

const initialLocations = locations.map((location) => ({
  ...location,
  latitude: parseFloat(location.latitude),
  longitude: parseFloat(location.longitude),
}))





const fetchKitesurfSpots = async function () {
  return initialLocations
};

const useKiteSurfSpots = () => {
  return useQuery({
    queryKey: ["kitesurfSpots"],
    queryFn: fetchKitesurfSpots,
  });
};

export default useKiteSurfSpots;
