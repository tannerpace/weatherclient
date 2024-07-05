const { Box, Typography, Stack } = require("@mui/material")
import Layout from "@components/Layout"
import Section from "@components/Section"
import Container from "@components/Container"
import Map from "@components/Map"

import styles from "@styles/SelectedLocation.module.scss"

const SpotMap = ({ location, goodPeriodsCount, percentageOfGoodPeriods }) => {
  const { location_latitude, location_longitude } = location
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
      {/* <main className={styles.main}> */}
      {/* <Section>
        <Container> */}
      <Map
        // className={styles.homeMap}
        width="800"
        height="450"
        center={{
          lat: location_latitude,
          lng: location_longitude,
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
      {/* </Container>
      </Section> */}
      {/* </main> */}
    </Box>
  )
}

export default SpotMap
