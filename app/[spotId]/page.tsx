"use client"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import useKiteSurfSpots from "../hooks/useKiteSurfSpots"
import { queryClient } from "../queryClient"
import { FilterProvider } from "../context/FilterContext"
import { QueryClientProvider } from "@tanstack/react-query"

const Map = dynamic(() => import("@/components/Map"), { ssr: false })

const SpotPage: React.FC = () => {
  const router = useRouter()
  const { spotId } = router.query
  const { data: kitesurfSpots, isLoading } = useKiteSurfSpots()
  const [spot, setSpot] = useState(null)

  useEffect(() => {
    if (router.isReady) {
      const spot = kitesurfSpots?.find((spot) => spot.id === spotId)
      if (spot) setSpot(spot)
    }
  }, [router.isReady, spotId, kitesurfSpots])

  if (isLoading || !spot) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold mb-4">{spot.name}</h1>
      <div className="w-full p-4 h-full">
        <Map
          position={[spot.latitude, spot.longitude]}
          kitesurfSpots={[spot]}
        />
      </div>
    </div>
  )
}

const Page: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <SpotPage />
      </FilterProvider>
    </QueryClientProvider>
  )
}

export default Page
