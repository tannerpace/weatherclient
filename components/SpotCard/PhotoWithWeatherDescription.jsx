import { Refresh } from "@mui/icons-material"
import { Box, Typography, IconButton } from "@mui/material"
import { useQueryClient } from "react-query"
import usePink from "@/hooks/usePink"
const PhotoWithWeatherDescription = ({ location }) => {
  const queryClient = useQueryClient()
  const { pink } = usePink()
  return (
    <Box
      sx={{
        height: "100%",
        backgroundImage: `url(${location?.location_img_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "500px",
        width: "100%",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.6)",
        backgroundColor: "rgba(0,0,0,0.5)",
        "&:hover": {
          boxShadow: "0px 0px 10px rgba(16, 81, 211, 0.5)",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "#ffffff",
          fontWeight: "bold",
          textShadow: "3px 3px 6px rgba(0,0,0,0.75)",
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {/*Name like  Tonight */}
        {location?.weather?.name || (
          <IconButton
            sx={{
              color: pink,
            }}
            onClick={() => {
              queryClient.invalidateQueries("locations")
            }}
          >
            <Refresh />
          </IconButton>
        )}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "#ffffff",
          marginTop: "10px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.75)",
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {location?.weather?.detailedForecast}
      </Typography>

      {!location?.weather?.detailedForecast && (
        <>
          <Typography
            color="white"
            paragraph
            fontFamily="monospace"
            fontWeight="normal"
            sx={{
              lineHeight: 1.5,
              fontSize: "1.2rem",
              backgroundColor: "rgba(0,0,0,0.6)",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Weather data is not available. Please try refreshing or check back
            later.
          </Typography>
        </>
      )}
    </Box>
  )
}

export default PhotoWithWeatherDescription
