import { Box, Card, Stack, Typography, Slide } from "@mui/material"
import { memo } from "react"

import dayjs from "dayjs"
import Image from "next/image"
import useTextStyles from "@/hooks/useTextStyles"
import useColor from "@/hooks/useColor"
import useColorInverse from "@/hooks/useColorInverse"
import WindDial from "@/components/Home/SpotCard/WindDial"

const SlideCard = ({ item, index, handleCreateSession, viableDirections }) => {
  const textStyles = useTextStyles()
  const color = useColor()
  const colorInverse = useColorInverse()

  return (
    <Slide
      direction="right"
      in={true}
      style={{ transformOrigin: "0 0 0" }}
      {...(true ? { timeout: index < 3 ? 400 * index : 600 } : {})}
    >
      <Card
        onClick={() =>
          handleCreateSession({
            startTime: item.startTime,
            windSpeed: item.windSpeed,
            windDirection: item.windDirection,
          })
        }
        component={Card}
        key={item.number}
        sx={{
          backgroundColor: color,
          "&:hover": {
            cursor: "pointer",
          },
          display: "flex",
          flexDirection: "column",
          width: "120px",
          minWidth: "140px",
          borderRadius: "28px",
          border: item?.isDaytime ? "3px solid #18a963" : "3px solid #e31475",
          padding: "0px",
          margin: "0px 2px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            width: "100%",
            borderRadius: "15px 15px 0px 0px",
            overflow: "hidden",
          }}
        >
          <Image
            src={item.icon}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            width={120}
            height={120}
          />
          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              background: color,
            }}
          ></Box>
          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
          >
            <Stack
              sx={{
                borderBottom: `2px solid ${colorInverse}`,
                backgroundColor: "transparent",
                mt: 0.5,
                mb: 0.5,
                ml: 0.5,
                mr: 0.5,
              }}
            >
              <Typography sx={textStyles}>
                {dayjs(item.startTime).format("ddd, DD")}
                <br></br>
                {dayjs(item.startTime).format("h:mm A")}
              </Typography>
              <Typography sx={textStyles}>
                {item?.windDirection} {item?.windSpeed}
              </Typography>
              <WindDial item={item} viableDirections={viableDirections} />
            </Stack>
          </Box>
        </Box>
      </Card>
    </Slide>
  )
}

export default memo(SlideCard)
