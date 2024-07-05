import { Box, Card, Typography } from "@mui/material"
import WindDial from "./WindDial"
import { Http } from "@mui/icons-material"

const NoPeriods = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",

        borderRadius: "sm",
        overflowX: "scroll",
        overflowY: "hidden",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Card
        component={Card}
        sx={{
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
          },
          display: "flex",
          flexDirection: "column",
          width: "120px",
          minWidth: "140px",
          borderRadius: "28px",
          border: "3px",
          maxHeight: "290px",
          padding: "0px",
          margin: "8px 10px 10px 0px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            width: "100%",
            borderRadius: "20px 20px 0px 0px",
            overflow: "hidden",
          }}
        >
          <Box
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            width={120}
            height={120}
          />
          {/* overlay */}
          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              borderRadius: "20px 20px 0px 0px",
            }}
          ></Box>
          <Typography
            sx={{
              position: "absolute",
              top: "75px",
              left: "10px",
              fontSize: "0.9rem",
              fontFamily: "monospace",
            }}
          >
            No Periods to display: hit clear
          </Typography>

          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",

              "&:before": {
                content: '""',
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              },
            }}
          >
            <span>
              {/* <WindDial
                item={item}
                viableDirections={viableDirections}
              /> */}
            </span>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default NoPeriods
