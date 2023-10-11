import { Breadcrumbs, Container, Grid, Link, Typography } from "@mui/material";
import DestinationCard from "../components/DestinationCard";
import DestinationCardProps from "../interfaces/DestinationCardProps";
import { hemsedal, saalbach, zermatt, chamonix, verbier, davos, courchevel, innsbruck, stMoritz } from "../mockData/destinations";

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
  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Grid container spacing={4}>
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
    </Container>
  );
}
