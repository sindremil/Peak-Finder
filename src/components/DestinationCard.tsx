import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HeightIcon from "@mui/icons-material/Height";
import RouteIcon from "@mui/icons-material/Route";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DestinationCardProps from "../interfaces/DestinationCardProps";

function DestinationName(props: { name: string }): JSX.Element {
  const { name } = props;
  return (
    <CardContent>
      <Typography variant="h4">{name}</Typography>
    </CardContent>
  );
}

function DestinationImage(props: { src: string; alt: string }): JSX.Element {
  const { src, alt } = props;

  return <CardMedia sx={{ height: 240 }} image={src} title={alt} />;
}

// List items in the in the card
function DestinationHeight(props: {
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
  return (
    <ListItem sx={{ display: "flex", flexWrap: "wrap" }}>
      <ListItemIcon>
        <RouteIcon />
      </ListItemIcon>
      <Box sx={{ display: "flex", color: "white" }}>
        <ListItemText
          primary={`${beginner} km`}
          sx={{ background: "blue", padding: "0.5vw 0.25vw" }}
        />
        <ListItemText
          primary={`${intermediate} km`}
          sx={{ background: "red", padding: "0.5vw 0.25vw" }}
        />
        <ListItemText
          primary={`${advanced} km`}
          sx={{ background: "black", padding: "0.5vw 0.25vw" }}
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
      <ListItemText primary={`${lifts} heiser`} />
    </ListItem>
  );
}

// Contains all the info about the destinatio.
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
  return (
    <CardContent>
      <List>
        <DestinationHeight
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
    <Container>
      <Card raised>
        <CardActionArea>
          <DestinationName name={name} />
          <DestinationImage src={imageSrc} alt={imageAlt} />
          <DestinationInfo
            lowestPoint={lowestPoint}
            highestPoint={highestPoint}
            beginner={beginner}
            intermediate={intermediate}
            advanced={advanced}
            lifts={lifts}
          />
        </CardActionArea>
      </Card>
    </Container>
  );
}
