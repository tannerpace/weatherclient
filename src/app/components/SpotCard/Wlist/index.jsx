import { Box } from "@mui/material"
import { memo } from "react"

import useColor from "@/hooks/useColor"
import SlideCard from "@/components/Home/SpotCard/SlideCard"

const WList = ({ statePeriods, handleCreateSession, viableDirections }) => {
  const color = useColor()

  return (
    <Box
      sx={{
        color: color,
        mt: 2,
        height: "100%",
        width: "100%",
        minHeight: "152px",
        borderRadius: "20px 20px 0px 0px",
        backgroundColor: color,
        opacity: "0.8",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        overflowX: "scroll",
        "&::-webkit-scrollbar": {
          width: "7px",
          height: "7px",
        },
        "&::-webkit-scrollbar-track": {
          background: color,
        },
        "&::-webkit-scrollbar-thumb": {
          background: `linear-gradient(to bottom,
                                      rgba(0, 88, 176, 0.8),
                                      rgba(125, 186, 184, 0.8),
                                      rgba(243, 180, 100, 0.8),
                                      rgba(255, 147, 131, 0.8))`,
          borderRadius: "20px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: `linear-gradient(to top,
                                      rgba(0, 88, 176, 0.8),
                                      rgba(125, 186, 184, 0.8),
                                      rgba(243, 180, 100, 0.8),
                                      rgba(0, 192, 168, 0.8),
                                      rgba(108, 180, 213, 0.8),
                                      rgba(146, 130, 224, 0.8))`,
        },
      }}
    >
      {statePeriods.map((item, index) => (
        <SlideCard
          key={item.id} // Assuming `item.id` is the unique identifier
          item={item}
          index={index}
          handleCreateSession={handleCreateSession}
          viableDirections={viableDirections}
        />
      ))}
    </Box>
  )
}

export default memo(WList)
