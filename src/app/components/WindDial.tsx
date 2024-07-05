import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import useWindDirectionToNumber from "@/app/hooks/useWindDirectionToNumber"

type WindDirection = "N" | "S" | "E" | "W" | "NE" | "NW" | "SE" | "SW"

interface WindDialProps {
  viableDirections?: WindDirection[]
  item?: {
    windDirection: WindDirection
  }
  windDirection?: WindDirection
  relative?: boolean
  size?: number
}

const WindDial: React.FC<WindDialProps> = ({
  viableDirections = [],
  item = { windDirection: "S" },
  windDirection = "S",
  relative = false,
  size = 33,
}) => {
  const direction = item.windDirection || windDirection
  const { result } = useWindDirectionToNumber(direction)
  const viable = viableDirections.includes(direction)
  const resetRotation = -46

  return (
    <div
      className="relative"
      style={{
        transform: `rotate(${resetRotation}deg)`,
      }}
    >
      <FontAwesomeIcon
        icon={faArrowUp}
        size="2x"
        style={{
          position: relative ? "relative" : "absolute",
          top: 0,
          left: relative ? 0 : 33,
          backgroundColor: "transparent",
          color: relative ? "green" : viable ? "#59d95d" : "red",
          transform: `rotate(${result}deg)`,
          fontSize: size,
        }}
      />
    </div>
  )
}

export default WindDial
