import CircleIcon from "@mui/icons-material/Circle";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import PentagonIcon from "@mui/icons-material/Pentagon";
import SquareIcon from "@mui/icons-material/Square";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
  Typography,
  styled,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import SkiliftIcon from "../../assets/ChairLiftIcon.svg";
import GondolaIcon from "../../assets/GondolaIcon.svg";
import surfaceLiftIcon from "../../assets/SurfaceLiftIcon.svg";

// ListItemIconCentered is a new MUI class which copies ListItemIcon
// The difference is that it also has 'justifyContent: "center"'
// This is used instead of having a similar sx tag in all the ListItemIcons
const ListItemIconCentered = styled(ListItemIcon)({
  justifyContent: "center",
});

// This component displays information about destination's piste.
function DestinationPiste({
  pisteType,
  pisteDistance,
  PisteIcon,
  iconColor,
}: {
  pisteType: string;
  pisteDistance: number;
  // OverridableComponent... is the type of MUI Icons
  PisteIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  iconColor: string;
}): JSX.Element {
  return (
    <ListItem>
      <ListItemIconCentered>
        <PisteIcon sx={{ color: iconColor }} />
      </ListItemIconCentered>
      <ListItemText primary={pisteType} secondary={`${pisteDistance} km`} />
    </ListItem>
  );
}

// This component displays a total of the pistes/lifts availible
function DestinationTotal({
  totalType,
  totalNumber,
}: {
  totalType: string;
  totalNumber: number;
}): JSX.Element {
  return (
    <ListItem>
      <ListItemIconCentered>
        <DragHandleIcon sx={{ color: "Black" }} />
      </ListItemIconCentered>
      <ListItemText
        primary="Totalt"
        secondary={`${totalNumber} ${
          totalType.toLowerCase() === "piste" ? "km" : ""
        }`}
      />
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
  totalSlope,
}: {
  beginner: number;
  intermediate: number;
  advanced: number;
  totalSlope: number;
}): JSX.Element {
  return (
    <Grid item xs={12} sm={6} tabIndex={0}>
      <Typography variant="h4" gutterBottom>
        Skibakker
      </Typography>
      <List>
        <DestinationPiste
          pisteType="Nybegynner"
          pisteDistance={beginner}
          PisteIcon={CircleIcon}
          iconColor="Blue"
        />
        <DestinationPiste
          pisteType="Middels"
          pisteDistance={intermediate}
          PisteIcon={SquareIcon}
          iconColor="Red"
        />
        <DestinationPiste
          pisteType="Vanskelig"
          pisteDistance={advanced}
          PisteIcon={PentagonIcon}
          iconColor="Black"
        />
        <DestinationTotal totalType="Piste" totalNumber={totalSlope} />
      </List>
    </Grid>
  );
}

// This function converts a svg path to just the file name
function extractFileName(path: string): string {
  const parts = path.split("/");
  let fileName = parts[parts.length - 1].replace(".svg", "");

  // Remove "icon" if it's part of the filename
  fileName = fileName.replace(/icon/gi, "");

  return fileName;
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
      <ListItemIconCentered>
        <Box
          component="img"
          src={liftIcon}
          alt={extractFileName(liftIcon)}
          sx={{ maxWidth: "50px" }}
          aria-hidden="true"
        />
      </ListItemIconCentered>
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
  totalLifts,
}: {
  gondolas: number;
  chairlifts: number;
  surfaceLifts: number;
  totalLifts: number;
}): JSX.Element {
  return (
    <Grid item xs={12} sm={6} tabIndex={0}>
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
        <DestinationTotal totalType="Lifts" totalNumber={totalLifts} />
      </List>
    </Grid>
  );
}

// This component displays Pists and Lifts
export default function DestinationPistesAndLifts({
  beginner,
  intermediate,
  advanced,
  totalSlope,
  gondolas,
  chairlifts,
  surfaceLifts,
  totalLifts,
}: {
  beginner: number;
  intermediate: number;
  advanced: number;
  totalSlope: number;
  gondolas: number;
  chairlifts: number;
  surfaceLifts: number;
  totalLifts: number;
}): JSX.Element {
  return (
    <Grid container spacing={2} sx={{ paddingTop: "20px" }}>
      <DestinationPistes
        beginner={beginner}
        intermediate={intermediate}
        advanced={advanced}
        totalSlope={totalSlope}
      />
      <DestinationLifts
        gondolas={gondolas}
        chairlifts={chairlifts}
        surfaceLifts={surfaceLifts}
        totalLifts={totalLifts}
      />
    </Grid>
  );
}
