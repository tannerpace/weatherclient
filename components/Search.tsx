"use client"

import Input from "@/app/shared/Input"
import React, { useState } from "react"

type SearchProps = {
  onSearch: (query: string) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    onSearch(query)
  }

  return (
    <div className="bg-cyan-200 flex items-center p-2 rounded-lg relative">
      <Input
        type="text"
        value={query}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setQuery(e.target.value)
        }
        placeholder="Search for restaurants..."
        required
        className="w-full pl-10 pr-4 py-2 rounded-lg"
      />
    </div>
  )
}

export default Search
