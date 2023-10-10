import DestinationCard from "../components/DestinationCard";
import DestinationCardProps from "../interfaces/DestinationCardProps";
import hemsedalImage from "../assets/hemsedal.jpg";
import { Container, Grid } from "@mui/material";

export default function Result(): JSX.Element {
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
  return (
    <Container sx={{marginTop: "2rem"}}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} lg={4}>
          <DestinationCard destinationCardProps={mockDestinationCardProps} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DestinationCard destinationCardProps={mockDestinationCardProps} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DestinationCard destinationCardProps={mockDestinationCardProps} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DestinationCard destinationCardProps={mockDestinationCardProps} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DestinationCard destinationCardProps={mockDestinationCardProps} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DestinationCard destinationCardProps={mockDestinationCardProps} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DestinationCard destinationCardProps={mockDestinationCardProps} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DestinationCard destinationCardProps={mockDestinationCardProps} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DestinationCard destinationCardProps={mockDestinationCardProps} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DestinationCard destinationCardProps={mockDestinationCardProps} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DestinationCard destinationCardProps={mockDestinationCardProps} />
        </Grid>
      </Grid>
    </Container>
  );
}
