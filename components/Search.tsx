"use client"

import React, { useState } from "react"

type SearchProps = {
  onSearch: (query: string) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("")

  const handleSearch = (term: string) => {
    onSearch(term)
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          const value = e.target.value
          setQuery(value)
          handleSearch(value)
        }}
        placeholder="Search for a location"
        className="w-full py-2 px-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
      />
    </div>
  )
}

export default Search
