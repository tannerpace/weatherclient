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
    <div className="flex flex-row w-full justify-between items-center p-2 bg-black">
      <div className="flex-grow mr-2">
        <Search onSearch={onSearch} />
      </div>
      <div className="flex-shrink-0">
        <OutdoorActivitySelector />
      </div>
    </div>
  )
}

export default SearchAndActivitiesLayout
