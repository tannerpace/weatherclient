"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Button,
  Popover,
} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons"

// Bitmask enum for activities
enum ActivityEnum {
  Kitesurfing = 1 << 0, // 1
  Hiking = 1 << 1, // 2
  Cycling = 1 << 2, // 4
  Fishing = 1 << 3, // 8
  HuntingDuck = 1 << 4, // 16
  HuntingDeer = 1 << 5, // 32
  HuntingTurkey = 1 << 6, // 64
  Running = 1 << 7, // 128
  Surfing = 1 << 8, // 256
  FishingRedfish = 1 << 9, // 512
  ShrimpingWithPoles = 1 << 10, // 1024
}

// Utility function to decode bitmask into an array of selected activities
const decodeActivities = (bitmask: number): ActivityEnum[] => {
  return Object.values(ActivityEnum).filter(
    (activity) => typeof activity === "number" && bitmask & (activity as number)
  ) as ActivityEnum[]
}

const encodeActivities = (activities: ActivityEnum[]): number => {
  return activities.reduce((bitmask, activity) => bitmask | activity, 0)
}

// hook to manage selected activities
const useActivitySelector = () => {
  const [selectedActivities, setSelectedActivities] = useState<ActivityEnum[]>(
    []
  )

  // Load selected activities from localStorage when the hook is initialized
  useEffect(() => {
    const storedBitmask = localStorage.getItem("outdoorActivitiesBitmask")
    if (storedBitmask) {
      const bitmask = parseInt(storedBitmask, 10)
      setSelectedActivities(decodeActivities(bitmask))
    }
  }, [])

  // Save selected activities to localStorage whenever they change
  useEffect(() => {
    const bitmask = encodeActivities(selectedActivities)
    localStorage.setItem("outdoorActivitiesBitmask", bitmask.toString())
  }, [selectedActivities])

  // Toggle a single activity on/off
  const toggleActivity = (activityValue: string) => {
    const activity = parseInt(activityValue) as ActivityEnum
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity))
    } else {
      setSelectedActivities([...selectedActivities, activity])
    }
  }

  // Clear all selected activities
  const clearActivities = () => {
    setSelectedActivities([])
  }

  return { selectedActivities, toggleActivity, clearActivities }
}

// Available activities for selection
const activities = [
  { label: "Kitesurfing", value: ActivityEnum.Kitesurfing.toString() },
  { label: "Hiking", value: ActivityEnum.Hiking.toString() },
  { label: "Cycling", value: ActivityEnum.Cycling.toString() },
  { label: "Fishing", value: ActivityEnum.Fishing.toString() },
  { label: "Hunting - Duck", value: ActivityEnum.HuntingDuck.toString() },
  { label: "Hunting - Deer", value: ActivityEnum.HuntingDeer.toString() },
  { label: "Hunting - Turkey", value: ActivityEnum.HuntingTurkey.toString() },
  { label: "Running", value: ActivityEnum.Running.toString() },
  { label: "Surfing", value: ActivityEnum.Surfing.toString() },
  { label: "Fishing - Redfish", value: ActivityEnum.FishingRedfish.toString() },
  {
    label: "Shrimping with Poles",
    value: ActivityEnum.ShrimpingWithPoles.toString(),
  },
]

// Main component
const OutdoorActivitySelector: React.FC = () => {
  const { selectedActivities, toggleActivity, clearActivities } =
    useActivitySelector() // Use the custom hook

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null) // Anchor element for popover

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget) // Set the anchor to the button
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl) // Boolean state for the popover open/close

  return (
    <div className="p-2">
      {/* OPEN */}
      <Button
        startIcon={<FontAwesomeIcon icon={faFilter} />}
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        style={{ marginBottom: "16px" }}
      >
        Select Activities
      </Button>

      {/* Popover instead of Dialog */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="p-4">
          <FormControl fullWidth>
            <InputLabel id="activity-select-label">Activities</InputLabel>
            <Select
              labelId="activity-select-label"
              id="activity-select"
              multiple
              value={selectedActivities.map((activity) => activity.toString())}
              onChange={(event) => {
                const value = event.target.value as string[]
                value.forEach((activityValue) => toggleActivity(activityValue))
              }}
              renderValue={(selected) =>
                (selected as string[])
                  .map(
                    (value) =>
                      activities.find((activity) => activity.value === value)
                        ?.label
                  )
                  .join(", ")
              }
              style={{ width: "100%" }}
            >
              {/* LIST */}
              {activities.map((activity) => (
                <MenuItem key={activity.value} value={activity.value}>
                  <Checkbox
                    checked={selectedActivities
                      .map((activity) => activity.toString())
                      .includes(activity.value)}
                  />
                  <ListItemText primary={activity.label} />
                </MenuItem>
              ))}
              {/* CLEAR */}
              <MenuItem
                onClick={clearActivities}
                style={{ justifyContent: "center", color: "red" }}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ marginRight: "8px" }}
                />
                Clear Selections
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </Popover>
    </div>
  )
}

export default OutdoorActivitySelector
