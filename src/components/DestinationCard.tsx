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
          <CardContent>
            <Typography variant="h4">Hemsedal</Typography>
          </CardContent>
          <CardMedia
            sx={{ height: 240 }}
            image={hemsedalImage}
            title="Hemsedal's Roni chairlift"
          />
          <CardContent>
            <List>
              <ListItem>
                <ListItemIcon>
                  <HeightIcon />
                </ListItemIcon>
                <ListItemText primary="1004m (2160m - 3164m)" />
              </ListItem>
              <ListItem sx={{ display: "flex", flexWrap: "wrap" }}>
                <ListItemIcon>
                  <RouteIcon />
                </ListItemIcon>
                <Box sx={{ display: "flex", color: "white" }}>
                  <ListItemText
                    primary="35km"
                    sx={{ background: "blue", padding: "0.5vw 0.25vw" }}
                  />
                  <ListItemText
                    primary="53km"
                    sx={{ background: "red", padding: "0.5vw 0.25vw" }}
                  />
                  <ListItemText
                    primary="22km"
                    sx={{ background: "black", padding: "0.5vw 0.25vw" }}
                  />
                </Box>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ArrowOutwardIcon />
                </ListItemIcon>
                <ListItemText primary="12 heiser" />
              </ListItem>
            </List>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
}
