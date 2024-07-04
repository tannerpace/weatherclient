"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { Chip } from "@mui/material"
import { AllergenType, allergenColors } from "./AllergenFilter"
import { alergychips } from "@/allergenOptions"

const Profile = () => {
  const [selectedAllergens, setSelectedAllergens] = useState<AllergenType[]>([])

  useEffect(() => {
    const savedPreferences = localStorage.getItem("dietaryPreferences")
    if (savedPreferences) {
      setSelectedAllergens(JSON.parse(savedPreferences))
    }
  }, [])

  const handleAllergenChange = (value: AllergenType) => {
    setSelectedAllergens((prevPreferences) =>
      prevPreferences.includes(value)
        ? prevPreferences.filter((item) => item !== value)
        : [...prevPreferences, value]
    )
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    localStorage.setItem(
      "dietaryPreferences",
      JSON.stringify(selectedAllergens)
    )
    alert("Preferences saved!")
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Dietary Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="allergen-filter-wrapper mb-4">
          {alergychips.map((option) => (
            <Chip
              key={option.value}
              icon={option.icon}
              label={option.label}
              clickable
              sx={{
                backgroundColor: selectedAllergens.includes(option.value)
                  ? allergenColors[option.value]
                  : undefined,
                color: selectedAllergens.includes(option.value)
                  ? "#fff"
                  : undefined,
              }}
              onClick={() => handleAllergenChange(option.value)}
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Preferences
        </button>
      </form>
    </div>
  )
}

export default Profile
