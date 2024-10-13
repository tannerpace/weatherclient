"use client"
import React, { useState } from "react"
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Button,
  Popover,
  Box,
} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons"
import ActivityEnum, { activities } from "@/app/enums/ActivityEnum"
import { useFilterContext } from "@/app/context/FilterContext"

interface OutdoorActivitySelectorProps {
  onActivityFilter: (activities: ActivityEnum[]) => void // Accept the prop
}

const OutdoorActivitySelector: React.FC<OutdoorActivitySelectorProps> = ({
  onActivityFilter,
}) => {
  const { selectedActivities, handleActivityChange } = useFilterContext()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const toggleActivity = (activityValue: string) => {
    const activity = parseInt(activityValue) as number
    const updatedActivities = selectedActivities.includes(activity)
      ? selectedActivities.filter((a) => a !== activity)
      : [...selectedActivities, activity]

    handleActivityChange(updatedActivities)
    onActivityFilter(updatedActivities) // Call the onActivityFilter function with the updated activities
  }

  const clearActivities = () => {
    handleActivityChange([])
    onActivityFilter([]) // Clear the filter when activities are cleared
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
      <Button
        startIcon={<FontAwesomeIcon icon={faFilter} />}
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: "16px" }}
      >
        Select Activities
      </Button>

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
        <Box padding={2} minWidth={300}>
          <FormControl fullWidth>
            <InputLabel id="activity-select-label">Activities</InputLabel>
            <Select
              labelId="activity-select-label"
              id="activity-select"
              multiple
              value={selectedActivities.map((activity) => activity.toString())}
              onChange={(event) => {
                const value = event.target.value as string[]
                const selectedActivityEnums = value.map((activityValue) =>
                  parseInt(activityValue)
                )
                handleActivityChange(selectedActivityEnums)
                onActivityFilter(selectedActivityEnums) // Call the filter function here
              }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return "No activities selected"
                }
                return (selected as string[])
                  .map(
                    (value) =>
                      activities.find((activity) => activity.value === value)
                        ?.label
                  )
                  .join(", ")
              }}
            >
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
            </Select>
            <Box display="flex" justifyContent="flex-end" marginTop={2}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<FontAwesomeIcon icon={faTimes} />}
                onClick={clearActivities}
              >
                Clear
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Popover>
    </Box>
  )
}

export default OutdoorActivitySelector
