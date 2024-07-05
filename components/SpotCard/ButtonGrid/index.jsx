import { Grid } from "@mui/material"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import Class from "@mui/icons-material/Class"
import { GiTrashCan } from "react-icons/gi"
import { BsSunset } from "react-icons/bs"
import CardButton from "@/components/Home/SpotCard/CardButton"
import { LocalActivity } from "@mui/icons-material"
import { useIsTanner } from "@/hooks/useIsTanner"

const ButtonGrid = ({
  isFiltered,
  handleFilterPeriods,
  handleViewSessions,
  handleExpandClick,
  handleCreatePostDialogOpen,
  handleNavToLocationPosts,
  handleDeleteLocation = () => {},
}) => {
  const tanner = useIsTanner()
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      minHeight={100}
      spacing={1}
      sx={{ p: 2, position: "relative" }}
    >
      <CardButton
        color={!isFiltered ? "teal" : "#9a3a0a"}
        clickHandler={handleFilterPeriods}
        startIcon={isFiltered ? <FilterAltIcon /> : <FilterAltOffIcon />}
        label={isFiltered ? "Show All" : "Filter"}
        ariaLabel={"apply filter"}
      />

      {/* <CardButton
        color="#3192fa"
        clickHandler={handleViewSessions}
        startIcon={<Class />}
        label={"Sessions"}
        ariaLabel={"create session"}
        variant="contained"
      /> */}

      <CardButton
        color="blue"
        clickHandler={handleExpandClick}
        startIcon={<BsSunset />}
        label={"Forecast"}
        ariaLabel={"create session"}
      />

      <CardButton
        color="#41902f"
        clickHandler={handleDeleteLocation}
        // startIcon={<PostAdd />}
        label={"Delete Location"}
        ariaLabel={"Delete Location"}
        variant="outlined"
        disabled={!tanner}
      />

      <CardButton
        color="#9f40ff"
        clickHandler={handleNavToLocationPosts}
        // startIcon={<PostAdd />}
        label={"View Posts"}
        ariaLabel={"view location posts"}
      />
    </Grid>
  )
}

export default ButtonGrid
