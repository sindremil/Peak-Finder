import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ListItem,
  ListItemText,
  Rating,
  Snackbar,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import giveRating from "../../api/giveRating";
import DestinationInterface from "../../interfaces/Destination";
import Extras from "./Extras";
import Header from "./Header";
import PistesAndLifts from "./PistesAndLifts";

// This component displays an image associated with a destination.
function DestinationImage({
  name,
  img,
}: {
  name: string;
  img: string;
}): JSX.Element {
  return (
    <CardMedia
      image={img}
      title={name}
      sx={{ height: "400px" }}
      aria-label={`Bilde av ${name}`}
    />
  );
}

// This component displays the country of a destination.
function Country({ country }: { country: string }): JSX.Element {
  return (
    <ListItem>
      <ListItemText primary="Land" secondary={country} />
    </ListItem>
  );
}

// This component displays the height range of a destination.
function Altitude({
  lowestPoint,
  highestPoint,
}: {
  lowestPoint: number;
  highestPoint: number;
}): JSX.Element {
  const heightDiff = highestPoint - lowestPoint;
  return (
    <ListItem>
      <ListItemText
        primary="Meter over havet"
        secondary={`${lowestPoint} m - ${highestPoint} m (${heightDiff} m)`}
      />
    </ListItem>
  );
}

// This component displays information about ski pass prices.
function Pass({ passPrice }: { passPrice: number }): JSX.Element {
  return (
    <ListItem>
      <ListItemText primary="Dagspass voksen" secondary={`${passPrice} €`} />
    </ListItem>
  );
}

// This component displays a list of destination information,
// including country and height, using the previously defined functions.
function Info({
  country,
  lowestPoint,
  highestPoint,
  passPrice,
}: {
  country: string;
  lowestPoint: number;
  highestPoint: number;
  passPrice: number;
}): JSX.Element {
  return (
    <Grid container spacing={1} tabIndex={0}>
      <Grid item xs={12} sm={4}>
        <Country country={country} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Altitude lowestPoint={lowestPoint} highestPoint={highestPoint} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Pass passPrice={passPrice} />
      </Grid>
    </Grid>
  );
}

function ReviewButton({
  handleRatingDialogOpen,
}: {
  handleRatingDialogOpen: () => void;
}): JSX.Element {
  return (
    <Grid
      container
      spacing={1}
      sx={{ justifyContent: "center", paddingTop: "20px" }}
    >
      <Button onClick={handleRatingDialogOpen} variant="outlined">
        Vurder destinasjon
      </Button>
    </Grid>
  );
}

// This component displays a Dialog to add a review
// It sends the value to the Destination function
function GiveReview({
  isOpen,
  handleClose,
  handleGiveRating,
}: {
  isOpen: boolean;
  handleClose: () => void;
  handleGiveRating: (rating: number) => void;
}): JSX.Element {
  const [newRating, setNewRating] = useState(0);
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Gi en vurdering</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <Rating
          name="newRating"
          value={newRating}
          onChange={(_event, value: number | null) => {
            if (value != null) {
              setNewRating(value);
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Avbryt</Button>
        <Button
          onClick={() => {
            handleGiveRating(newRating);
          }}
        >
          Send inn
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// This is the main component exported from the module.
// It uses the previously defined functions to display
// information about the destination, including
// images, name, country, height, ski tracks, ski lifts, ski pass prices, and user reviews.
export default function Destination({
  destination,
}: {
  destination: DestinationInterface;
}): JSX.Element {
  const {
    Resort: name,
    Country: country,
    HighestPoint: highestPoint,
    LowestPoint: lowestPoint,
    DayPassPriceAdult: passPrice,
    BeginnerSlope: beginnerSlope,
    IntermediateSlope: intermediateSlope,
    DifficultSlope: difficultSlope,
    TotalSlope: totalSlope,
    Snowparks: snowPark,
    NightSki: nightSki,
    GondolaLifts: gondolaLifts,
    ChairLifts: chairlifts,
    SurfaceLifts: surfaceLifts,
    TotalLifts: totalLifts,
    Certified: certified,
  } = destination;
  let { TotalRating: totalRating, AmountOfRatings: amountOfRatings } =
    destination;

  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [responseOpen, setResponseOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (newRating: number) =>
      giveRating({ resort: name, rating: newRating }),
  });

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setResponseOpen(false);
  };
  if (mutation.isSuccess) {
    totalRating = mutation.data.giveRating.TotalRating;
    amountOfRatings = mutation.data.giveRating.AmountOfRatings;
  }

  const handleRatingDialogOpen = () => {
    setIsRatingDialogOpen(true);
  };

  const handleRatingDialogClose = () => {
    setIsRatingDialogOpen(false);
  };

  const handleGiveRating = (newValue: number) => {
    mutation.mutate(newValue);
    setResponseOpen(true);
    handleRatingDialogClose();
  };

  const imagePath = `images/resorts/${name
    .toLowerCase()
    .replace(/[^a-z]/g, "")}.jpg`;

  return (
    <>
      <Card raised>
        <DestinationImage name={name} img={imagePath} />
        <Header
          destinationName={name}
          totalRating={totalRating}
          amountOfRatings={amountOfRatings}
        />
        <CardContent sx={{ paddingTop: "0px", paddingLeft: "20px" }}>
          <Info
            country={country}
            lowestPoint={lowestPoint}
            highestPoint={highestPoint}
            passPrice={passPrice}
          />
          <PistesAndLifts
            beginner={beginnerSlope}
            intermediate={intermediateSlope}
            advanced={difficultSlope}
            totalSlope={totalSlope}
            gondolas={gondolaLifts}
            chairlifts={chairlifts}
            surfaceLifts={surfaceLifts}
            totalLifts={totalLifts}
          />
          <Extras
            snowPark={snowPark}
            nightSki={nightSki}
            certified={certified}
          />
          <ReviewButton handleRatingDialogOpen={handleRatingDialogOpen} />
        </CardContent>
      </Card>
      <GiveReview
        isOpen={isRatingDialogOpen}
        handleClose={handleRatingDialogClose}
        handleGiveRating={handleGiveRating}
      />
      <Snackbar
        open={responseOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="success">Vurdering sendt!</Alert>
      </Snackbar>
    </>
  );
}
