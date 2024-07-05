import useWindDirectionToNumber from "./useWindDirectionToNumber"

import { FaLocationArrow } from "react-icons/fa"
import { Box } from "@mui/material"
const WindDial = ({
  viableDirections = [],
  item = {
    windDirection: "S",
  },
  windDirection = "S",
  relative = false,
  size = 33,
}) => {
  const { result } = useWindDirectionToNumber(
    item.windDirection || windDirection
  )
  const viable = viableDirections.includes(item.windDirection || windDirection)
  const resetRotation = -46
  return (
    <Box
      sx={{
        position: "relative",
        transform: `rotate(${resetRotation}deg)`,
      }}
    >
      <FaLocationArrow
        size={size}
        style={{
          position: relative ? "relative" : "absolute",
          top: 0,
          left: relative ? 0 : 33,
          backgroundColor: "transparent",
          color: relative ? "green" : viable ? "#59d95d" : "red",
          transform: `rotate(${result}deg)`,
        }}
      />
    </Box>
  )
}

export default WindDial
