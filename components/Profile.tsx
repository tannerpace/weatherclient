"use client"

import React, { useState, useEffect } from "react"
import ProfileMap from "@/components/ProfileMap"
import { KitesurfSpot } from "@/app/api/mock"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import ProfileRenderingInfo from "@/components/ProfileRenderingInfo"
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"

const Profile: React.FC = () => {
  const [locations, setLocations] = useState<KitesurfSpot[]>([])
  const [minWindspeed, setMinWindspeed] = useState<number>(0)
  const [viableDirections, setViableDirections] = useState<{
    [key: string]: number
  }>({
    N: 0,
    NE: 0,
    E: 0,
    SE: 0,
    S: 0,
    SW: 0,
    W: 0,
    NW: 0,
  })
  const [selectedLocation, setSelectedLocation] = useState<KitesurfSpot | null>(
    null
  )
  const [open, setOpen] = useState(false)
  const [newLocation, setNewLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [locationName, setLocationName] = useState("")

  useEffect(() => {
    const savedLocations = JSON.parse(
      localStorage.getItem("userLocations") || "[]"
    )
    const savedMinWindspeed = JSON.parse(
      localStorage.getItem("minWindspeed") || "0"
    )
    const savedViableDirections = JSON.parse(
      localStorage.getItem("viableDirections") || "{}"
    )
    setLocations(savedLocations)
    setMinWindspeed(savedMinWindspeed)
    setViableDirections(savedViableDirections)
  }, [])

  useEffect(() => {
    localStorage.setItem("userLocations", JSON.stringify(locations))
  }, [locations])

  const handleAddLocation = (lat: number, lng: number) => {
    setNewLocation({ lat, lng })
    setOpen(true)
  }

  const handleSaveLocation = () => {
    if (locationName && newLocation) {
      const newSpot: KitesurfSpot = {
        id: Date.now(),
        latitude: newLocation.lat,
        longitude: newLocation.lng,
        name: locationName,
        island: "",
        winddirections: "",
        waves: "",
        depth: "",
        description: "",
        experience: "",
        references: "",
        location_img_url: "",
        viable_directions: viableDirections,
        minWindspeed: minWindspeed,
      }
      setLocations((prevLocations) => [...prevLocations, newSpot])
      setOpen(false)
      setLocationName("")
      setNewLocation(null)
    }
  }

  const handleDeleteLocation = (id: number) => {
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location.id !== id)
    )
  }

  const handleMinWindspeedChange = (event: Event, value: number | number[]) => {
    if (typeof value === "number") {
      setMinWindspeed(value)
      localStorage.setItem("minWindspeed", JSON.stringify(value))
    }
  }

  const handleViableDirectionChange = (direction: string) => {
    setViableDirections((prevDirections) => {
      const newDirections = { ...prevDirections }
      newDirections[direction] = newDirections[direction] ? 0 : 1
      localStorage.setItem("viableDirections", JSON.stringify(newDirections))
      return newDirections
    })
  }

  const handleLocationSelect = (location: KitesurfSpot) => {
    setSelectedLocation(location)
  }

  const handleClose = () => {
    setOpen(false)
    setLocationName("")
    setNewLocation(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">My Kitesurf Locations</h1>
      <div className="mb-4" style={{ height: "400px" }}>
        <ProfileMap
          locations={locations}
          onLocationAdd={handleAddLocation}
          onLocationDelete={handleDeleteLocation}
          onLocationSelect={handleLocationSelect}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Saved Locations</h2>
        <FontAwesomeIcon
          icon={faPlus}
          className="text-green-500 cursor-pointer"
          onClick={() => setOpen(true)}
        />
      </div>
      <ul className="mb-4">
        {locations.map((location) => (
          <li key={location.id} className="mb-2">
            {location.name}
            <button
              onClick={() => handleDeleteLocation(location.id)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {selectedLocation && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">
            Weather Information for {selectedLocation.name}
          </h2>
          <ProfileRenderingInfo
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
            minWindspeed={selectedLocation.minWindspeed || minWindspeed}
            viableDirections={
              selectedLocation.viable_directions || viableDirections
            }
          />
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Location</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Location Name"
            type="text"
            fullWidth
            variant="standard"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
          <Typography id="min-windspeed-slider" gutterBottom>
            Minimum Windspeed
          </Typography>
          <Slider
            value={minWindspeed}
            onChange={handleMinWindspeedChange}
            aria-labelledby="min-windspeed-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={40}
          />
          <FormGroup>
            {Object.keys(viableDirections).map((direction) => (
              <FormControlLabel
                key={direction}
                control={
                  <Checkbox
                    checked={!!viableDirections[direction]}
                    onChange={() => handleViableDirectionChange(direction)}
                  />
                }
                label={direction}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveLocation} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Profile
