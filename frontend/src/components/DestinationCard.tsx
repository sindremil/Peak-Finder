import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HeightIcon from "@mui/icons-material/Height";
import RouteIcon from "@mui/icons-material/Route";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router-dom";
import DestinationCardProps from "../interfaces/DestinationCardProps";

// In your DestinationName component
function DestinationName(props: { name: string }): JSX.Element {
  const { name } = props;
  const lineHeight = 3.2; // Line height in em units, adjust as needed

  return (
    <CardContent
      sx={{
        position: "relative",
        overflow: "hidden",
        lineHeight: `${lineHeight}em`,
        maxHeight: `${lineHeight * 2}em`, // Set to double the line-height to accommodate exactly two lines
        flex: "1 0 auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        {name}
      </Typography>
    </CardContent>
  );
}

function DestinationImage(props: { src: string; alt: string }): JSX.Element {
  const { src, alt } = props;

  return <CardMedia sx={{ height: 150 }} image={src} title={alt} />;
}

function DestinationElevation(props: {
  lowestPoint: number;
  highestPoint: number;
}): JSX.Element {
  const { lowestPoint, highestPoint } = props;
  const heightDelta: number = highestPoint - lowestPoint;
  return (
    <ListItem>
      <ListItemIcon>
        <HeightIcon />
      </ListItemIcon>
      <ListItemText
        primary={`${lowestPoint} m - ${highestPoint} m (${heightDelta} m)`}
      />
    </ListItem>
  );
}

function DestinationPiste(props: {
  beginner: number;
  intermediate: number;
  advanced: number;
}): JSX.Element {
  const { beginner, intermediate, advanced } = props;

  // Modifies the padding of all piste per difficulty total
  const listItemPadding: { padding: string } = {
    padding: "0.4vw 1vw",
  };

  return (
    <ListItem sx={{ display: "flex", flexWrap: "wrap", paddingRight: "6px" }}>
      <ListItemIcon>
        <RouteIcon />
      </ListItemIcon>
      <Box sx={{ display: "flex", color: "white" }}>
        <ListItemText
          primary={`${beginner} km`}
          sx={{ ...listItemPadding, background: "blue" }}
        />
        <ListItemText
          primary={`${intermediate} km`}
          sx={{ ...listItemPadding, background: "red" }}
        />
        <ListItemText
          primary={`${advanced} km`}
          sx={{ ...listItemPadding, background: "black" }}
        />
      </Box>
    </ListItem>
  );
}

function DestinationLifts(props: { lifts: number }): JSX.Element {
  const { lifts } = props;
  return (
    <ListItem>
      <ListItemIcon>
        <ArrowOutwardIcon />
      </ListItemIcon>
      <ListItemText primary={`${lifts} heiser`} data-testid="totalLifts" />
    </ListItem>
  );
}

// Combines the information about a destination's elevation, piste, and lifts
// into a singel component which is used in the DestinationCard below
function DestinationInfo({
  lowestPoint,
  highestPoint,
  beginner,
  intermediate,
  advanced,
  lifts,
}: {
  lowestPoint: number;
  highestPoint: number;
  beginner: number;
  intermediate: number;
  advanced: number;
  lifts: number;
}): JSX.Element {
  // Text read by screen readers when the card is focused
  const ariaLabel = `
  Laveste punkt ${lowestPoint} meter.
  Høyeste punkt ${highestPoint} meter.
  Høydeforskjell ${highestPoint - lowestPoint} meter.
  Det er ${beginner} kilometer med nybegynner løyper,
  ${intermediate} kilometer med middels løyper, og
  ${advanced} kilometer med vanskelige løyper.
  Det er ${lifts} heiser.
  `;

  return (
    <CardContent aria-label={ariaLabel}>
      <List>
        <DestinationElevation
          lowestPoint={lowestPoint}
          highestPoint={highestPoint}
        />
        <DestinationPiste
          beginner={beginner}
          intermediate={intermediate}
          advanced={advanced}
        />
        <DestinationLifts lifts={lifts} />
      </List>
    </CardContent>
  );
}

// Combines the DestinationName, DestinationImage and DestinationInfo component
// into a DestinationCard
export default function DestinationCard({
  destinationCardProps,
}: {
  destinationCardProps: DestinationCardProps;
}): JSX.Element {
  const {
    name,
    imageSrc,
    imageAlt,
    lowestPoint,
    highestPoint,
    beginner,
    intermediate,
    advanced,
    lifts,
  } = destinationCardProps;

  return (
    <Card
      raised
      data-testid="DestinationCard"
      sx={{ height: "500px", display: "flex", flexDirection: "column" }}
    >
      <CardActionArea
        component={Link}
        to={`/${encodeURIComponent(name)}`}
        state={{ isFromResult: true }}
        sx={{ height: "100%" }}
      >
        <DestinationName name={name} />
        <DestinationImage src={imageSrc} alt={imageAlt} />
        <CardContent
          sx={{
            flex: "2 1 auto", // Allows the content to grow and shrink, with more priority than the title
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <DestinationInfo
            lowestPoint={lowestPoint}
            highestPoint={highestPoint}
            beginner={beginner}
            intermediate={intermediate}
            advanced={advanced}
            lifts={lifts}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
