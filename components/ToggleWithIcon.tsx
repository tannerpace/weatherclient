"use client"

import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons"
import ActivityEnum, { activities } from "@/app/enums/ActivityEnum"
import { useFilterContext } from "@/app/context/FilterContext"
import { Switch } from "@headlessui/react"

interface OutdoorActivitySelectorProps {
  onActivityFilter: (activities: ActivityEnum[]) => void
}

const OutdoorActivitySelector: React.FC<OutdoorActivitySelectorProps> = ({
  onActivityFilter,
}) => {
  const { selectedActivities, handleActivityChange } = useFilterContext()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const toggleActivity = (activityValue: string) => {
    const activity = parseInt(activityValue) as number
    const updatedActivities = selectedActivities.includes(activity)
      ? selectedActivities.filter((a) => a !== activity)
      : [...selectedActivities, activity]

    handleActivityChange(updatedActivities)
    onActivityFilter(updatedActivities)
  }

  const clearActivities = () => {
    handleActivityChange([])
    onActivityFilter([])
  }

  return (
    <div className="relative flex flex-col items-center space-y-2">
      <button
        className="flex items-center justify-center space-x-2 bg-black text-green-500 font-mono py-1 px-4 rounded-md border-2 border-green-500 transition duration-300 hover:bg-green-500 hover:text-black"
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faFilter} />
        <span>Select Activities</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-black text-green-500 border-2 border-green-500 rounded-md p-4 w-full max-w-sm z-10 font-mono">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg">Activities</h3>
            <button
              onClick={handleClose}
              className="text-green-500 hover:text-black bg-green-500 rounded-md px-2 py-1 hover:bg-black"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="space-y-2">
            {activities.map((activity) => (
              <div key={activity.value} className="flex items-center">
                <Switch.Group>
                  <Switch
                    checked={selectedActivities.includes(
                      parseInt(activity.value)
                    )}
                    onChange={() => toggleActivity(activity.value)}
                    className={`${
                      selectedActivities.includes(parseInt(activity.value))
                        ? "bg-green-500"
                        : "bg-black border border-green-500"
                    } relative inline-flex h-6 w-12 items-center rounded-none transition-colors duration-300 ease-in-out`}
                  >
                    <span
                      className={`${
                        selectedActivities.includes(parseInt(activity.value))
                          ? "translate-x-6"
                          : "translate-x-0"
                      } inline-block h-5 w-5 transform bg-black rounded-none border-2 border-green-500 transition-transform duration-300 ease-in-out`}
                    />
                  </Switch>
                  <span className="ml-3 text-green-500 text-sm">
                    {activity.label}
                  </span>
                </Switch.Group>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6 space-x-2">
            <button
              onClick={clearActivities}
              className="flex items-center bg-black text-green-500 border-2 border-green-500 px-4 py-1 rounded-md hover:bg-green-500 hover:text-black transition duration-300"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Clear
            </button>
            <button
              onClick={handleClose}
              className="bg-green-500 text-black px-4 py-1 rounded-md border-2 border-black hover:bg-black hover:text-green-500 transition duration-300"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OutdoorActivitySelector
