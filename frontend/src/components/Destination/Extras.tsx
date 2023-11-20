import NightlightIcon from "@mui/icons-material/Nightlight";
import SnowboardingIcon from "@mui/icons-material/Snowboarding";
import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import LogoIcon from "../../assets/logos/logo-black-cropped.svg";

// This component displays information about a specific extra for the destination
function DestinationExtra({
  text,
  boolean,
  Icon,
}: {
  text: string;
  boolean: boolean;
  // OverridableComponent... is the type of MUI Icons
  // Imgs/Svgs in this project are imported as string paths
  // Therefore "Icon" is either a OverridableComponent or a string
  Icon:
    | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
      })
    | string;
}): JSX.Element {
  const tekst = boolean ? "Ja" : "Nei";
  let icon;
  // Handles if the "Icon" is a MUI Icon or a path string
  if (typeof Icon === "string") {
    icon = (
      <Box
        component="img"
        src={LogoIcon}
        alt="Logo"
        sx={{ maxWidth: "40px" }}
      />
    );
  } else {
    icon = <Icon sx={{ minWidth: "40px" }} />;
  }
  return (
    <ListItem
      aria-label={
        boolean ? `Har ${text.toLowerCase()}` : `Mangler ${text.toLowerCase()}`
      }
    >
      {icon}
      <ListItemText
        primary={text}
        secondary={tekst}
        sx={{ paddingLeft: "5px" }}
      />
    </ListItem>
  );
}

// This component displays if the destination has a snow park, night ski or is certified
export default function DestinationExtras({
  snowPark,
  nightSki,
  certified,
}: {
  snowPark: boolean;
  nightSki: boolean;
  certified: boolean;
}): JSX.Element {
  return (
    <Box sx={{ paddingTop: "16px" }}>
      <Typography variant="h4">Ekstra</Typography>
      <Grid container spacing={2} tabIndex={0}>
        <Grid item xs={12} sm={3}>
          <DestinationExtra
            text="Park"
            boolean={snowPark}
            Icon={SnowboardingIcon}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DestinationExtra
            text="Kveldskjøring"
            boolean={nightSki}
            Icon={NightlightIcon}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <DestinationExtra
            text="Peak Finder sertifisering"
            boolean={certified}
            Icon={LogoIcon}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
