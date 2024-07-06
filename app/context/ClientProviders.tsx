// /Users/tan/GITHUB/weatherclient/app/context/ClientProviders.tsx
"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FilterProvider } from "../context/FilterContext"
import { SelectedLocationProvider } from "../context/SelectedLocationContext"
import { WeatherProvider } from "./WeatherContext"

const queryClient = new QueryClient()

const ClientProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <SelectedLocationProvider>
          <WeatherProvider>{children}</WeatherProvider>
        </SelectedLocationProvider>
      </FilterProvider>
    </QueryClientProvider>
  )
}

export default ClientProviders
