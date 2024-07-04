import { useQuery } from "@tanstack/react-query"
import locations from "../../../mock"
const fetchKitesurfSpots = async () => {
  return locations
}

const useKiteSurfSpots = () => {
  return useQuery({
    queryKey: ["kitesurfSpots"],
    queryFn: fetchKitesurfSpots
  })
}

export default useKiteSurfSpots
