"use client"
import { Grid, Chip } from "@mui/material"
import useColorInverse from "@/hooks/useColorInverse"
import { alpha } from "@mui/material/styles"
// import useColor from "@/hooks/useColor"
function CardButton({
  color,
  clickHandler,
  startIcon,
  label,
  ariaLabel,
  variant = "default",
  disabled = false,
}) {
  const colorInverse = useColorInverse(color)
  // const colorFromHook = useColor()
  return (
    <Grid item xs={6}>
      <Chip
        disabled={disabled}
        startIcon={startIcon}
        sx={{
          minWidth: "50px",
          "& .MuiChip-label": {
            color: "whitesmoke",

            fontFamily: "Ready Player One",
            // textShadow: "1px 0px -px rgba(255, 255, 255, 0.9)",
            fontSize: "clamp(0.3rem, .5vw, 1.2rem)",
          },
          backgroundColor: color,
          color: colorInverse,
          textTransform: "uppercase",
          border: `1px solid ${alpha(colorInverse, 0.2)}`,
          boxShadow: `0 0 5px ${alpha(colorInverse, 0.6)}`,
          "&:hover": {
            backgroundColor: alpha(colorInverse, 0.9),
            boxShadow: `0 0 15px ${alpha(colorInverse, 0.9)}`,
          },
          "&:active": {
            backgroundColor: alpha(colorInverse, 0.7),
            boxShadow: "none",
          },
        }}
        size="small"
        variant={variant}
        onClick={clickHandler}
        label={label}
        clickable
      />
    </Grid>
  )
}

export default CardButton
