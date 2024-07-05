const { Box, Typography, Stack } = require("@mui/material")

import Map from "@components/Map"

const SpotMap = ({ location, goodPeriodsCount, percentageOfGoodPeriods }) => {
  const { latitude, longitude } = location
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        borderRadius: 1,
      }}
    >
      <Map
        width="800"
        height="450"
        center={{
          lat: latitude,
          lng: longitude,
        }}
        zoom={11}
      >
        {({ TileLayer }) => (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="OpenStreetMap"
          />
        )}
      </Map>
    </Box>
  )
}

export default SpotMap
