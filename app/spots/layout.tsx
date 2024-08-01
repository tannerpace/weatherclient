"use client"

import React from "react"
import { TabGroup } from "@/components/TabGroup"
import locations from "../api/mock"

export default function Layout({ children }: { children: React.ReactNode }) {
  const items = locations.map(
    (location: { name: any; id: any; latitude: any; longitude: any }) => ({
      text: location.name,
      slug: `${location.id}`,
      weatherUrl: `https://api.weather.gov/points/${location.latitude},${location.longitude}/forecast`,
    })
  )

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TabGroup
        path="/"
        items={[
          {
            text: "Home",
          },
          ...items,
        ]}
      />
      <div>{children}</div>
    </div>
  )
}
