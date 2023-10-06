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

const destinationImgSrc =
  "https://vcdn.bergfex.at/images/resized/75/a6f8bc60ae1e5475_4c61ad8798145fc6@2x.jpg";

function BoxWithPaddingLeft({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <Box sx={{ paddingLeft: "20px" }}>{children}</Box>;
}

function DestinationImage({ img }: { img: string }): JSX.Element {
  return (
    <Box
      component="img"
      src={img}
      alt="Ski Destination"
      sx={{ maxWidth: "100%" }}
    />
  );
}

function DestinationName({ name }: { name: string }): JSX.Element {
  return <Typography variant="h2">{name}</Typography>;
}

function DestinationCountry({ country }: { country: string }): JSX.Element {
  return (
    <ListItem>
      <ListItemText primary="Country" secondary={country} />
    </ListItem>
  );
}

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

export default function Destination({
  destinationName,
}: {
  destinationName: string;
}) {
  const reviews = [
    {
      username: "John Smith",
      comment: "Great Place, would love to return here some day.",
    },
    {
      username: "Ola Nordmann",
      comment: "We had a great time in Hemsedal! Loved the beginner tracks.",
    },
  ];
  return (
    <Box>
      <Paper elevation={3}>
        <DestinationImage img={destinationImgSrc} />
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
        <BoxWithPaddingLeft>
          <DestinationReviews reviewList={reviews} />
        </BoxWithPaddingLeft>
      </Paper>
    </Box>
  );
}
