import {
  Breadcrumbs,
  Container,
  Drawer,
  Fab,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import DestinationCard from "../components/DestinationCard";
import DestinationCardProps from "../interfaces/DestinationCardProps";
import { hemsedal, saalbach, zermatt, chamonix, verbier, davos, courchevel, innsbruck, stMoritz } from "../mockData/destinations";
import Filter from "../components/Filter";

function addResult(destinationCardProps: DestinationCardProps): JSX.Element {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <DestinationCard destinationCardProps={destinationCardProps} />
    </Grid>
  );
}

// This funciton creates bread crumbs used for navigation between pages
function ResultsBreadCrumbs(): JSX.Element {
  return (
    <Grid item xs={12}>
      <Breadcrumbs aria-label="Navigasjon">
        <Link underline="hover" color="inherit" href="/">
          Hjem
        </Link>
        <Typography color="text.primary">Resultater</Typography>
      </Breadcrumbs>
    </Grid>
  );
}

export default function Result(): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        Filtrer
      </Fab>
      <Grid container spacing={4} sx={{ marginTop: "0.2vw" }}>
        <ResultsBreadCrumbs />
        {/* Temporary since we cannot implement this without backend */}
        {addResult(hemsedal)}
        {addResult(saalbach)}
        {addResult(chamonix)}
        {addResult(stMoritz)}
        {addResult(zermatt)}
        {addResult(verbier)}
        {addResult(davos)}
        {addResult(courchevel)}
        {addResult(innsbruck)}
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
