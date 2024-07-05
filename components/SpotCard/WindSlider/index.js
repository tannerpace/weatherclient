import { Slider, Box, IconButton } from "@mui/material"
import { useCallback } from "react"
import useWind from "@/hooks/useWind"
import { useStyles } from "@/components/Home/SpotCard/WindSlider/useStyles"
import useColor from "@/hooks/useColor"
import useColorInverse from "@/hooks/useColorInverse"
import { Add, Remove } from "@mui/icons-material"

export default function WindSlider() {
  const { windLevel, setWindLevel } = useWind()
  const styles = useStyles()
  const colorInverse = useColorInverse()

  const onChangeWind = useCallback(
    (event, newValue) => {
      setWindLevel(newValue)
    },
    [setWindLevel]
  )

  const incrementWind = useCallback(() => {
    setWindLevel((windLevel) => Math.min(windLevel + 1, 35))
  }, [setWindLevel])

  const decrementWind = useCallback(() => {
    setWindLevel((windLevel) => Math.max(windLevel - 1, 0))
  }, [setWindLevel])
  return (
    <>
      <Box sx={styles.box}>
        <Box sx={styles.innerBox}>
          <IconButton
            onClick={incrementWind}
            aria-label="increase wind level"
            sx={styles.button}
          >
            <Add />
          </IconButton>
          <Slider
            orientation="vertical"
            toolTip="Wind"
            label="Wind"
            aria-label="Wind Level slider"
            defaultValue={windLevel}
            min={0}
            max={35}
            onChange={onChangeWind}
            value={windLevel}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            sx={styles.slider}
          />
          <IconButton
            onClick={decrementWind}
            aria-label="decrease wind level"
            sx={styles.button}
          >
            <Remove />
          </IconButton>
        </Box>
      </Box>
    </>
  )
}
