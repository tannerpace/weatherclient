"use client"
import React from "react"

import useKiteSurfSpots from "@/app/hooks/useKiteSurfSpots"
import { RenderingInfo } from "@/components/RenderingInfo"

interface PageProps {
  params: { id: string }
}

export default function Page({ params }: PageProps) {
  const { data: kitesurfSpots, isLoading, error } = useKiteSurfSpots()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading kite surfing spots: {error.message}</div>
  }

  const kiteSurfSpot = kitesurfSpots?.find(
    (spot: { id: { toString: () => string } }) =>
      spot.id.toString() === params.id
  )

  if (!kiteSurfSpot) {
    return <div>Spot not found</div>
  }

  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-3">
      <div className="col-span-full space-y-3 lg:col-span-4">
        <h1 className="truncate text-2xl font-medium capitalize text-gray-200">
          {kiteSurfSpot.name}
        </h1>
        <p className="font-medium text-gray-500">{kiteSurfSpot.description}</p>
      </div>
      <div className="-order-1 col-span-full lg:order-none lg:col-span-2">
        <RenderingInfo
          latitude={kiteSurfSpot.latitude.toString()}
          longitude={kiteSurfSpot.longitude.toString()}
        />
      </div>
    </div>
  )
}
