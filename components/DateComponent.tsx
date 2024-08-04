import React from "react"
import dayjs from "dayjs"

interface DateComponentProps {
  dateInput?: string
}

const DateComponent: React.FC<DateComponentProps> = ({ dateInput }) => {
  console.log(dateInput)
  const formattedDate = dayjs(dateInput).format("YYYY-MM-DD HH:mm:ss")

  return (
    <div>
      <p>{`Weather period's time: ${formattedDate}`}</p>
    </div>
  )
}

export default DateComponent
