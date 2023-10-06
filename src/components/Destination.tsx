import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemIcon,
  SvgIconTypeMap,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import StarIcon from "@mui/icons-material/Star";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactNode } from "react";
import GondolaIcon from "../assets/GondolaIcon.svg";
import SkiliftIcon from "../assets/SkiliftIcon.svg";
import TbarLiftIcon from "../assets/TbarLiftIcon.svg";

// This is a temporary constant for the destination img
// Will be changed later to be a prop and therefore dynamic
const destinationImgSrc =
  "https://vcdn.bergfex.at/images/resized/75/a6f8bc60ae1e5475_4c61ad8798145fc6@2x.jpg";

// This function takes a single argument children (which is a ReactNode)
// and returns a JSX element (React component) representing a <Box> with left padding.
// It wraps the children with a box that has a left padding of 20 pixels.
function BoxWithPaddingLeft({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <Box sx={{ paddingLeft: "20px" }}>{children}</Box>;
}

// This function takes two arguments, name and img,
// and returns a JSX element representing an <img> tag
// with the specified src and alt attributes.
// It's used to display an image associated with a destination.
function DestinationImage({
  name,
  img,
}: {
  name: string;
  img: string;
}): JSX.Element {
  return <Box component="img" src={img} alt={name} sx={{ maxWidth: "100%" }} />;
}

// This function takes a single argument name
// and returns a JSX element representing a <Typography> component
// with the specified name as the content.
// It's used to display the name of a destination.
function DestinationName({ name }: { name: string }): JSX.Element {
  return <Typography variant="h2">{name}</Typography>;
}

// This function takes a single argument country
// and returns a JSX element representing a <ListItem>
// with the primary text "Country" and the country as secondary text.
// It's used to display the country of a destination.
function DestinationCountry({ country }: { country: string }): JSX.Element {
  return (
    <ListItem>
      <ListItemText primary="Country" secondary={country} />
    </ListItem>
  );
}

// This function takes two arguments, minHeight and maxHeight,
// and returns a JSX element representing a <ListItem>
// with the primary text "Height" and a string showing the range of heights
// (e.g., "1000 m - 3300 m (2300 m)") as secondary text.
// It's used to display the height range of a destination.
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
        primary="Height"
        secondary={`${minHeight} m - ${maxHeight} m (${heightDiff} m)`}
      />
    </ListItem>
  );
}

// This function takes three arguments, country, minHeight, and maxHeight,
// and returns a JSX element that contains a list of destination information,
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

// This function takes four arguments, trackType, trackDistance, TrackIcon, and iconColor,
// and returns a JSX element representing a <ListItem>
// with an icon (specified by TrackIcon),
// the trackType as primary text, and the trackDistance as secondary text.
// It's used to display information about ski tracks.
function DestinationTrack({
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

// This function takes three arguments, blue, red, and black,
// and returns a JSX element that displays a list of ski tracks
// of different difficulty levels (beginner, intermediate, difficult)
// using the previously defined DestinationTrack function.
function DestinationTracks({
  blue,
  red,
  black,
}: {
  blue: number;
  red: number;
  black: number;
}): JSX.Element {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Ski slopes
      </Typography>
      <List>
        <DestinationTrack
          trackType="Beginner"
          trackDistance={blue}
          TrackIcon={CircleIcon}
          iconColor="Blue"
        />
        <DestinationTrack
          trackType="Intermediate"
          trackDistance={red}
          TrackIcon={SquareIcon}
          iconColor="Red"
        />
        <DestinationTrack
          trackType="Difficult"
          trackDistance={black}
          TrackIcon={StarIcon}
          iconColor="Black"
        />
      </List>
    </>
  );
}

// This function takes three arguments, liftType, liftAmount, and liftIcon,
// and returns a JSX element representing a <ListItem>
// with an icon (specified by liftIcon),
// the liftType as primary text, and the liftAmount as secondary text.
// It's used to display information about ski lifts.
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

// This function takes three arguments, gondolas, chairlifts, and tbarLifts,
// and returns a JSX element that displays a list of different types of ski lifts
// (e.g., gondolas, chairlifts, T-bar lifts)
// using the previously defined DestinationLift function.
function DestinationLifts({
  gondolas,
  chairlifts,
  tbarLifts,
}: {
  gondolas: number;
  chairlifts: number;
  tbarLifts: number;
}): JSX.Element {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Ski lifts
      </Typography>
      <List>
        <DestinationLift
          liftType="Gondolas"
          liftAmount={gondolas}
          liftIcon={GondolaIcon}
        />
        <DestinationLift
          liftType="Chairlifts"
          liftAmount={chairlifts}
          liftIcon={SkiliftIcon}
        />
        <DestinationLift
          liftType="T-bar lifts"
          liftAmount={tbarLifts}
          liftIcon={TbarLiftIcon}
        />
      </List>
    </>
  );
}

// This function takes two arguments, passType and passPrice,
// and returns a JSX element representing a <ListItem>
// with the passType as primary text and the passPrice as secondary text.
// It's used to display information about ski pass prices.
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

// This function takes two arguments, adult and youth,
// and returns a JSX element that displays a list of ski pass prices
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
        Ski pass prices
      </Typography>
      <List>
        <DestinationPass passType="Adult Day Pass" passPrice={adult} />
        <DestinationPass passType="Youth Day Pass" passPrice={youth} />
      </List>
    </>
  );
}

// This function takes two arguments, reviewer and comment,
// and returns a JSX element representing a <ListItem>
// with the reviewer as primary text and the comment as secondary text.
// It's used to display user reviews for the destination.
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

// This function takes an array of review objects as reviewList
// and returns a JSX element that displays a list of user reviews
// using the previously defined DestinationReview function.
function DestinationReviews({
  reviewList,
}: DestinationReviewsProps): JSX.Element {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      <List>
        {reviewList.map((review) => (
          <DestinationReview
            reviewer={review.username}
            comment={review.comment}
          />
        ))}
      </List>
    </>
  );
}

// This is the main component exported from the module.
// It takes a single argument destinationName
// and returns a JSX element representing a complete view of destination information.
// It uses the previously defined functions to display information
// about the destination, including
// images, name, country, height, ski tracks, ski lifts, ski pass prices, and user reviews.
export default function Destination({
  destinationName,
}: {
  destinationName: string;
}) {
  const reviews = [
    {
      username: "John Smith",
      comment: "Great place, would love to return here some day.",
    },
    {
      username: "Ola Nordmann",
      comment: "We had a great time in Hemsedal! Loved the beginner tracks.",
    },
  ];
  return (
    <Box>
      <Paper elevation={3} sx={{ marginBottom: "20px" }}>
        <DestinationImage name={destinationName} img={destinationImgSrc} />
        <BoxWithPaddingLeft>
          <DestinationName name={destinationName} />
        </BoxWithPaddingLeft>
        <BoxWithPaddingLeft>
          <DestinationInfo country="Norway" minHeight={1000} maxHeight={3300} />
        </BoxWithPaddingLeft>
        <BoxWithPaddingLeft>
          <DestinationTracks blue={8} red={7} black={6} />
        </BoxWithPaddingLeft>
        <BoxWithPaddingLeft>
          <DestinationLifts gondolas={2} chairlifts={6} tbarLifts={10} />
        </BoxWithPaddingLeft>
        <BoxWithPaddingLeft>
          <DestinationPrices adult={50} youth={30} />
        </BoxWithPaddingLeft>
      </Paper>
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <DestinationReviews reviewList={reviews} />
      </Paper>
    </Box>
  );
}
