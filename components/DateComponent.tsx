import React from "react"
import dayjs from "dayjs"

interface DateComponentProps {
  time?: string
}

const DateComponent: React.FC<DateComponentProps> = ({ time }) => {
  const theTime = dayjs(time).format("YYYY-MM-DD HH:mm:ss")

  return (
    <div>
      <p>{`Weather period's time: ${theTime}`}</p>
    </div>
  )
}

export default DateComponent
