import React from "react"
import dayjs from "dayjs"

/**
 * Formats an ISO 8601 date string to a more readable format.
 *
 * @param dateTimeString - The ISO 8601 date string to format.
 * @returns A formatted date string in "Weekday, Month Day, Year, HH:MM AM/PM" format.
 */
const formatDateTime = (dateTimeString: string): string => {
  if (!dateTimeString) return "Invalid date"

  const date = new Date(dateTimeString)
  if (isNaN(date.getTime())) return "Invalid date"

  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
}

interface DateComponentProps {
  dateInput?: string
}

const DateComponent: React.FC<DateComponentProps> = ({ dateInput }) => {
  console.log(dateInput)

  const formattedDateWithDayjs = dayjs(dateInput).format("YYYY-MM-DD HH:mm:ss")
  const formattedDateWithUtils = formatDateTime(dateInput || "")

  return (
    <div>
      <p>{`Formatted with dayjs: ${formattedDateWithDayjs}`}</p>
      <p>{`Formatted with formatDateTime: ${formattedDateWithUtils}`}</p>
    </div>
  )
}

export default DateComponent
