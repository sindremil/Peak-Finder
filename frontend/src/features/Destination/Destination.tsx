import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  ListItem,
  ListItemText,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import DestinationInterface from "../../interfaces/Destination";
import Extras from "./Extras";
import GiveReview from "./GiveReview";
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
  handleGiveReviewOpen: handleRatingDialogOpen,
}: {
  handleGiveReviewOpen: () => void;
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

  const [totalRating, setTotalRating] = useState(destination.TotalRating);
  const [amountOfRatings, setAmountOfRatings] = useState(
    destination.AmountOfRatings,
  );
  const [isGiveReviewOpen, setIsGiveReviewOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackBarOpen] = useState(false);

  let reviewed: boolean = false;
  const reviewedString = localStorage.getItem("reviewed");
  let reviewedArray: string[] = [];
  if (reviewedString) {
    reviewedArray = JSON.parse(reviewedString);
  }
  if (reviewedArray.includes(name)) {
    reviewed = true;
  }

  const handleGiveReviewOpen = () => {
    setIsGiveReviewOpen(true);
  };

  const handleGiveReviewClose = () => {
    setIsGiveReviewOpen(false);
  };

  const handleReviewGiven = (
    newTotalRating: number,
    newAmountOfRatings: number,
  ) => {
    localStorage.setItem(
      "reviewed",
      JSON.stringify(reviewedArray.concat(name)),
    );
    setTotalRating(newTotalRating);
    setAmountOfRatings(newAmountOfRatings);
    handleGiveReviewClose();
    setIsSnackBarOpen(true);
  };

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackBarOpen(false);
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
          hasReviewed={reviewed}
          handleGiveReviewOpen={handleGiveReviewOpen}
        />
        <CardContent sx={{ paddingTop: "0px", paddingRight: "0px" }}>
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
          {!reviewed && (
            <ReviewButton handleGiveReviewOpen={handleGiveReviewOpen} />
          )}
        </CardContent>
      </Card>
      {isGiveReviewOpen && (
        <GiveReview
          name={name}
          handleClose={handleGiveReviewClose}
          handleReviewGiven={handleReviewGiven}
        />
      )}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="success">Vurdering sendt!</Alert>
      </Snackbar>
    </>
  );
}
