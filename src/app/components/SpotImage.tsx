"use client"
import React from "react"
import { KitesurfSpot } from "../../../mock"
import Box from "@mui/material/Box"
interface SpotImageProps {
  spot: KitesurfSpot
}

const SpotImage: React.FC<SpotImageProps> = ({ spot }) => {
  return (
    <Box
      sx={{
        height: "100%",
        backgroundImage: `url(${spot?.location_img_url})`,
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
    />
  )
}

export default SpotImage
