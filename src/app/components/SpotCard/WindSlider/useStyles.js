import {
  deepPurple,
  deepOrange,
  green,
  red,
  yellow,
  lightGreen,
  amber,
  lightBlue,
} from "@mui/material/colors"
import useColor from "@/hooks/useColor"
import useColorInverse from "@/hooks/useColorInverse"
import useWind from "@/hooks/useWind"
import useMode from "@/hooks/useMode"
import useSliderColor from "@/hooks/useSliderColor"
export const useStyles = () => {
  const color = useColor()
  const colorInverse = useColorInverse()
  const { mode } = useMode()
  const { sliderColor } = useSliderColor()

  return {
    button: {
      color: colorInverse,
      backgroundColor: mode === "dark" ? deepPurple[500] : deepOrange[400],
      size: "small",
      width: "2rem",
      height: "2rem",
    },
    box: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: "100%",
      p: 2,
    },
    innerBox: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      backgroundColor: color,
      borderRadius: 1,
      p: 1,
    },
    slider: {
      color: sliderColor,
      "& .MuiSlider-thumb": {
        width: 14,
        height: 20,
        backgroundColor: sliderColor,
        border: `2px solid ${color}`,

        "&:hover, &.Mui-focusVisible": {
          boxShadow: `0px 0px 0px 8px ${sliderColor}80`, // 80 alpha
        },
      },
      "& .MuiSlider-valueLabel": {
        color: color,
        backgroundColor: sliderColor,
      },
      "& .MuiSlider-rail": {
        width: 8,
        backgroundColor: sliderColor,
      },
      "& .MuiSlider-track": {
        width: 8,
        backgroundImage: `linear-gradient(90deg, ${deepPurple[500]} 0%, ${deepOrange[300]} 100%)`,
      },
      "& .MuiSlider-mark": {
        width: 8,
        backgroundColor: sliderColor,
      },
    },
    typography: {
      color: colorInverse,
      flexGrow: 1,
      mt: 1,
    },
  }
}
