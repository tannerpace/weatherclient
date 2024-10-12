"use client"

import React, { FC } from "react"
import OutdoorActivitySelector from "./OutdoorActivitySelector"
import Search from "./Search"

interface SearchAndActivitiesLayoutProps {
  onSearch: (query: React.SetStateAction<string>) => void
}

const SearchAndActivitiesLayout: FC<SearchAndActivitiesLayoutProps> = ({
  onSearch,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-between items-center bg-black lg:space-y-0 lg:space-x-4">
      <div className="w-full md:w-2/3">
        <Search onSearch={onSearch} />
      </div>

      <div className="w-full md:w-auto">
        <OutdoorActivitySelector />
      </div>
    </div>
  )
}

export default SearchAndActivitiesLayout
