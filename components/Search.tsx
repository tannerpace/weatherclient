"use client"
import React, { useState } from "react"
import Input from "./Input"

type SearchProps = {
  onSearch: (query: React.SetStateAction<string>) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("")

  const handleSearch = (term: React.SetStateAction<string>) => {
    onSearch(term)
  }

  return (
    <div className="flex items-center rounded relative">
      <Input
        type="text"
        value={query}
        onChange={(e: { target: { value: any } }) => {
          const value = e.target.value
          setQuery(value)
          handleSearch(value)
        }}
        placeholder="Search for a location"
        required
        className="w-full py-2 rounded-lg p-2"
      />
    </div>
  )
}

export default Search
