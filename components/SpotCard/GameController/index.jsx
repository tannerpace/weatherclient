import useColor from "@/hooks/useColor"
import useColorInverse from "@/hooks/useColorInverse"
import { Box } from "@mui/material"

const GameController = ({
  leftComponent,
  rightComponent,
  borderOpacity = 0.9,
}) => {
  const color = useColor()
  const colorInverse = useColorInverse()
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        height: "100%",
        border: `3px dashed ${colorInverse}`,
        borderRadius: "20px",
        opacity: borderOpacity,
      }}
    >
      <Box
        sx={{
          width: "47%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%) translateX(-50%)",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
          },
        }}
      >
        {leftComponent}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          width: "6%",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          width: "47%",
        }}
      >
        {rightComponent}
      </Box>
    </Box>
  )
}

export default GameController
