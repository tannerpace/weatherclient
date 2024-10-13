import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons"
import ActivityEnum, { activities } from "@/app/enums/ActivityEnum"
import { useFilterContext } from "@/app/context/FilterContext"

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
    <div className="flex flex-col items-center space-y-4 p-2">
      <button
        className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faFilter} />
        <span>Select Activities</span>
      </button>

      {isOpen && (
        <div className="absolute bg-white shadow-lg rounded-lg p-4 w-80">
          <h3 className="text-lg font-semibold mb-4">Activities</h3>
          <div className="space-y-2">
            {activities.map((activity) => (
              <div key={activity.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={activity.value}
                  checked={selectedActivities
                    .map((activity) => activity.toString())
                    .includes(activity.value)}
                  onChange={() => toggleActivity(activity.value)}
                  className="mr-2"
                />
                <label htmlFor={activity.value} className="cursor-pointer">
                  {activity.label}
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={clearActivities}
              className="flex items-center bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              <span>Clear</span>
            </button>
            <button
              onClick={handleClose}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
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
