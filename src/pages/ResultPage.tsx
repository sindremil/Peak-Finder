import { Container, Drawer, Fab, Grid } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import DestinationCard from "../components/DestinationCard";
import DestinationCardProps from "../interfaces/DestinationCardProps";
import hemsedalImage from "../assets/hemsedal.jpg";
import Filter from "../components/Filter";

function addResult(destinationCardProps: DestinationCardProps): JSX.Element {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <DestinationCard destinationCardProps={destinationCardProps} />
    </Grid>
  );
}

export default function Result(): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mock values
  const mockDestinationCardProps: DestinationCardProps = {
    name: "Saalbach-Hinterglem-Leogang-Fieberbrunn",
    imageSrc: hemsedalImage,
    imageAlt: "Mock Image Alt",
    lowestPoint: 1030,
    highestPoint: 2479,
    beginner: 130,
    intermediate: 220,
    advanced: 80,
    lifts: 15,
  };

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Container sx={{ marginBottom: "2rem" }}>
      <Fab
        aria-label="filter"
        variant="extended"
        sx={{ position: "fixed", bottom: "2rem", right: "2rem" }}
        onClick={handleDrawer}
      >
        <FilterListIcon />
        Filter
      </Fab>
      <Grid container spacing={4} sx={{ marginTop: "0.2vw" }}>
        {/* Temporary since we cannot implement this without backend */}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
        {addResult(mockDestinationCardProps)}
      </Grid>
      <Drawer
        anchor="left"
        open={drawerOpen}
        sx={{ display: "flex", flexDirection: "column" }}
        onClose={handleDrawer}
        // To change the width of the drawer, the paper props must be manipulated
        PaperProps={{
          sx: {
            maxWidth: "300px",
          },
        }}
      >
        <Filter />
      </Drawer>
    </Container>
  );
}
