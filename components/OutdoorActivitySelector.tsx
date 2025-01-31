"use client"

import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFilter,
  faTimes,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons"
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

  const toggleActivity = (activityValue: string) => {
    const activity = parseInt(activityValue)
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
    <div className="relative w-full">
      <button
        className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-5 rounded-md hover:bg-blue-400 transition"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon icon={faFilter} />
        <span>Filter Activities</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-80 bg-white shadow-lg rounded-md p-4 z-20">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">Activities</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
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
                        : "bg-gray-300"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors ease-in-out`}
                  >
                    <span
                      className={`${
                        selectedActivities.includes(parseInt(activity.value))
                          ? "translate-x-6 bg-white"
                          : "translate-x-1 bg-white"
                      } inline-block h-4 w-4 rounded-full transition-transform`}
                    />
                  </Switch>
                  <span className="ml-3 text-gray-700">{activity.label}</span>
                </Switch.Group>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={clearActivities}
              className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              <FontAwesomeIcon icon={faTimes} />
              <span>Clear</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
            >
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Done</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OutdoorActivitySelector
