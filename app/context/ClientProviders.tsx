"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FilterProvider } from "../context/FilterContext"
import { SelectedLocationProvider } from "../context/SelectedLocationContext"

const queryClient = new QueryClient()

const ClientProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <SelectedLocationProvider>{children}</SelectedLocationProvider>
      </FilterProvider>
    </QueryClientProvider>
  )
}

export default ClientProviders
