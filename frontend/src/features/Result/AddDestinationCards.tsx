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

export default function AddDestinationCards({
  results,
}: {
  results: DestinationCardInterface[];
}): JSX.Element[] {
  const resultArray: JSX.Element[] = [];

  results.forEach((destinationCard: DestinationCardInterface) => {
    const {
      Resort,
      HighestPoint,
      LowestPoint,
      ElevationDifference,
      BeginnerSlope,
      IntermediateSlope,
      DifficultSlope,
      TotalLifts,
    } = destinationCard;
    const imagePath = `../images/resorts/${Resort.toLowerCase().replace(
      /[^a-z]/g,
      "",
    )}.webp`;
    const imageAlt = Resort;

    const destinationCardProps: DestinationCardProps = {
      name: Resort,
      highestPoint: HighestPoint,
      lowestPoint: LowestPoint,
      elevationDifference: ElevationDifference,
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
