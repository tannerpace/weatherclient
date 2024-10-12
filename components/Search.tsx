"use client"

import React, { useState } from "react"
import Input from "./Input"

type SearchProps = {
  onSearch: (query: string) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("")

  const handleSearch = (term: string) => {
    onSearch(term)
  }

  return (
    <Input
      type="text"
      value={query}
      onChange={(e: { target: { value: any } }) => {
        const value = e.target.value
        setQuery(value)
        handleSearch(value)
      }}
      placeholder="  Search for a location"
      required
      className="w-full min-h-10 md:min-h-12 rounded-lg px-3"
    />
  )
}

export default Search
