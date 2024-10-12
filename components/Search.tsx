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
      className="w-full rounded-lg"
    />
  )
}

export default Search
