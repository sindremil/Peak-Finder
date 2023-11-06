import { Grid } from "@mui/material";
import DestinationCard from "../components/DestinationCard";
import DestinationCardProps from "../interfaces/DestinationCardProps";

export default function addResult(
  destinationCardProps: DestinationCardProps
): JSX.Element {
  return (
    <Grid item xs={12} sm={6} lg={4} key={destinationCardProps.name}>
      <DestinationCard destinationCardProps={destinationCardProps} />
    </Grid>
  );
}
