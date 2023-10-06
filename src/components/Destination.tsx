import {
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemIcon,
  SvgIconTypeMap,
  CardMedia,
  CardContent,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import PentagonIcon from "@mui/icons-material/Pentagon";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import GondolaIcon from "../assets/GondolaIcon.svg";
import SkiliftIcon from "../assets/SkiliftIcon.svg";
import surfaceLiftIcon from "../assets/surfaceLiftIcon.svg";
import fischbach from "../assets/Fischbach.jpg";

// This component displays an image associated with a destination.
function DestinationImage({
  name,
  img,
}: {
  name: string;
  img: string;
}): JSX.Element {
  return <CardMedia image={img} title={name} sx={{ height: "400px" }} />;
}

// This component displays the name of a destination.
function DestinationName({ name }: { name: string }): JSX.Element {
  return <Typography variant="h2">{name}</Typography>;
}

// This component displays the country of a destination.
function DestinationCountry({ country }: { country: string }): JSX.Element {
  return (
    <ListItem>
      <ListItemText primary="Land" secondary={country} />
    </ListItem>
  );
}

// This component displays the height range of a destination.
function DestinationHeight({
  minHeight,
  maxHeight,
}: {
  minHeight: number;
  maxHeight: number;
}): JSX.Element {
  const heightDiff = maxHeight - minHeight;
  return (
    <ListItem>
      <ListItemText
        primary="Meter over havet"
        secondary={`${minHeight} m - ${maxHeight} m (${heightDiff} m)`}
      />
    </ListItem>
  );
}

// This component displays a list of destination information,
// including country and height, using the previously defined functions.
function DestinationInfo({
  country,
  minHeight,
  maxHeight,
}: {
  country: string;
  minHeight: number;
  maxHeight: number;
}): JSX.Element {
  return (
    <List>
      <DestinationCountry country={country} />
      <DestinationHeight minHeight={minHeight} maxHeight={maxHeight} />
    </List>
  );
}

// This component displays information about destination's piste.
function DestinationPiste({
  trackType,
  trackDistance,
  TrackIcon,
  iconColor,
}: {
  trackType: string;
  trackDistance: number;
  TrackIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  iconColor: string;
}): JSX.Element {
  return (
    <ListItem>
      <ListItemIcon>
        <TrackIcon sx={{ color: iconColor }} />
      </ListItemIcon>
      <ListItemText primary={trackType} secondary={`${trackDistance} km`} />
    </ListItem>
  );
}

// This component displays a list of pistes
// of different difficulty levels (beginner, intermediate, difficult)
// using the previously defined DestinationPiste function.
function DestinationPistes({
  beginner,
  intermediate,
  advanced,
}: {
  beginner: number;
  intermediate: number;
  advanced: number;
}): JSX.Element {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Skibakker
      </Typography>
      <List>
        <DestinationPiste
          trackType="Nybegynner"
          trackDistance={beginner}
          TrackIcon={CircleIcon}
          iconColor="Blue"
        />
        <DestinationPiste
          trackType="Middels"
          trackDistance={intermediate}
          TrackIcon={SquareIcon}
          iconColor="Red"
        />
        <DestinationPiste
          trackType="Vanskelig"
          trackDistance={advanced}
          TrackIcon={PentagonIcon}
          iconColor="Black"
        />
      </List>
    </>
  );
}

// This component displays information about the ski lifts.
function DestinationLift({
  liftType,
  liftAmount,
  liftIcon,
}: {
  liftType: string;
  liftAmount: number;
  liftIcon: string;
}): JSX.Element {
  return (
    <ListItem>
      <ListItemIcon>
        <Box component="img" src={liftIcon} sx={{ maxWidth: "50px" }} />
      </ListItemIcon>
      <ListItemText
        primary={liftType}
        secondary={liftAmount}
        sx={{ paddingLeft: "5px" }}
      />
    </ListItem>
  );
}

// This component displays a list of different types of ski lifts
// (e.g., gondolas, chairlifts and surfaces lifts)
// using the previously defined DestinationLift function.
function DestinationLifts({
  gondolas,
  chairlifts,
  surfaceLifts,
}: {
  gondolas: number;
  chairlifts: number;
  surfaceLifts: number;
}): JSX.Element {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Skiheiser
      </Typography>
      <List>
        <DestinationLift
          liftType="Gondoler"
          liftAmount={gondolas}
          liftIcon={GondolaIcon}
        />
        <DestinationLift
          liftType="Stolheiser"
          liftAmount={chairlifts}
          liftIcon={SkiliftIcon}
        />
        <DestinationLift
          liftType="Ankerheiser"
          liftAmount={surfaceLifts}
          liftIcon={surfaceLiftIcon}
        />
      </List>
    </>
  );
}

// This component displays information about ski pass prices.
function DestinationPass({
  passType,
  passPrice,
}: {
  passType: string;
  passPrice: number;
}): JSX.Element {
  return (
    <ListItem>
      <ListItemText primary={passType} secondary={`${passPrice} €`} />
    </ListItem>
  );
}

// This component displays a list of ski pass prices
// for both adults and youth using the previously defined DestinationPass function.
function DestinationPrices({
  adult,
  youth,
}: {
  adult: number;
  youth: number;
}): JSX.Element {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Skipass priser
      </Typography>
      <List>
        <DestinationPass passType="Dagspass voksen" passPrice={adult} />
        <DestinationPass passType="Dagspass ungdom" passPrice={youth} />
      </List>
    </>
  );
}

// This component displays user reviews for the destination.
function DestinationReview({
  reviewer,
  comment,
}: {
  reviewer: string;
  comment: string;
}): JSX.Element {
  return (
    <ListItem>
      <ListItemText primary={reviewer} secondary={comment} />
    </ListItem>
  );
}

type DestinationReviewsProps = {
  reviewList: { username: string; comment: string }[];
};

// This component displays a list of user reviews
// using the previously defined DestinationReview function.
function DestinationReviews({
  reviewList,
}: DestinationReviewsProps): JSX.Element {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Anmeldelser
      </Typography>
      <List>
        {reviewList.map((review) => (
          <DestinationReview
            key={review.username}
            reviewer={review.username}
            comment={review.comment}
          />
        ))}
      </List>
    </>
  );
}

// This is the main component exported from the module.
// It uses the previously defined functions to display
// information about the destination, including
// images, name, country, height, ski tracks, ski lifts, ski pass prices, and user reviews.
export default function Destination({
  destinationName,
}: {
  destinationName: string;
}) {
  const reviews = [
    {
      username: "John Smith",
      comment: "Great place, would love to return here some day!",
    },
    {
      username: "Ola Nordmann",
      comment:
        "Vi hadde det veldig gøy i Hemsdal. Skibakkene for nybegynnere var toppers!",
    },
  ];
  return (
    <>
      <Card sx={{ marginBottom: "20px" }} raised>
        <DestinationImage name={destinationName} img={fischbach} />
        <CardContent sx={{ paddingLeft: "20px" }}>
          <DestinationName name={destinationName} />
          <DestinationInfo country="Norge" minHeight={1000} maxHeight={3300} />
          <DestinationPistes beginner={8} intermediate={7} advanced={6} />
          <DestinationLifts gondolas={2} chairlifts={6} surfaceLifts={10} />
          <DestinationPrices adult={50} youth={30} />
        </CardContent>
      </Card>
      <Card sx={{ padding: "20px" }} raised>
        <DestinationReviews reviewList={reviews} />
      </Card>
    </>
  );
}
