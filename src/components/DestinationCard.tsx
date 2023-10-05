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
import hemsedalImage from "../assets/hemsedal.jpg";

export default function DestinationCard() {
  return (
    <Container>
      <Card raised>
        <CardActionArea>
          <DestinationName />
          <DestinationImage />
          <DestinationInfo />
        </CardActionArea>
      </Card>
    </Container>
  );
}

//Destination name, image and info
function DestinationName(): JSX.Element {
  return(
    <CardContent>
      <Typography variant="h4">Hemsedal</Typography>
    </CardContent>
  );
}

function DestinationImage(): JSX.Element {
  return(
    <CardMedia
      sx={{ height: 240 }}
      image={hemsedalImage}
      title="Hemsedal's Roni chairlift"
    />
  );
}

function DestinationInfo(): JSX.Element {
  return(
    <CardContent>
      <List>
        <DestinationHeight />
        <DestinationPiste />
        <DestinationLifts />
      </List>
    </CardContent>
  );
}


//List items in the in the card
function DestinationHeight(): JSX.Element {
  return (
    <ListItem>
      <ListItemIcon>
        <HeightIcon />
      </ListItemIcon>
      <ListItemText primary="1004m (2160m - 3164m)" />
    </ListItem>
  );
}

function DestinationPiste(): JSX.Element {
  return (
    <ListItem sx={{display: "flex", flexWrap: "wrap"}}>
      <ListItemIcon>
        <RouteIcon />
      </ListItemIcon>
      <Box sx={{display: "flex", color: "white"}}>
        <ListItemText primary="35km" sx={{background: "blue", padding: "0.5vw 0.25vw"}}/>
        <ListItemText primary="53km"  sx={{background: "red", padding: "0.5vw 0.25vw"}}/>
        <ListItemText primary="22km"  sx={{background: "black", padding: "0.5vw 0.25vw"}}/>
      </Box>
    </ListItem>
  );
}

function DestinationLifts(): JSX.Element {
  return(
    <ListItem>
      <ListItemIcon>
        <ArrowOutwardIcon />
      </ListItemIcon>
      <ListItemText primary="12 heiser" />
    </ListItem>
  );
}
