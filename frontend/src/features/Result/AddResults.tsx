import { Grid } from "@mui/material";
import DestinationCardInterface from "../../interfaces/DestinationCard";
import DestinationCardProps from "../../interfaces/DestinationCardProps";
import DestinationCard from "./DestinationCard";

function addResult(destinationCardProps: DestinationCardProps): JSX.Element {
  return (
    <Grid item xs={12} sm={6} lg={4} key={destinationCardProps.name}>
      <DestinationCard destinationCardProps={destinationCardProps} />
    </Grid>
  );
}

export default function AddResults({
  results,
}: {
  results: DestinationCardInterface[];
}): JSX.Element[] {
  const resultArray: JSX.Element[] = [];

  results.forEach((destinationCard: DestinationCardInterface) => {
    const {
      Resort,
      Country,
      HighestPoint,
      LowestPoint,
      BeginnerSlope,
      IntermediateSlope,
      DifficultSlope,
      TotalLifts,
    } = destinationCard;
    const imagePath = `../images/resorts/${Resort.toLowerCase().replace(
      /[^a-z]/g,
      "",
    )}.jpg`;
    const imageAlt = `Bilde av ${Resort}`;

    const destinationCardProps: DestinationCardProps = {
      name: Resort,
      country: Country,
      highestPoint: HighestPoint,
      lowestPoint: LowestPoint,
      beginner: BeginnerSlope,
      intermediate: IntermediateSlope,
      advanced: DifficultSlope,
      lifts: TotalLifts,
      imageSrc: imagePath,
      imageAlt,
    };
    resultArray.push(addResult(destinationCardProps));
  });

  return resultArray;
}
