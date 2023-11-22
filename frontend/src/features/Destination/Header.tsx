import {
  Box,
  CardContent,
  Grid,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// This component displays the name of a destination.
function DestinationName({ name }: { name: string }): JSX.Element {
  return (
    <Grid item xs={12} sm={9}>
      <Typography variant="h2">{name}</Typography>
    </Grid>
  );
}

// This component displays the rating of a destination
function DestinationRating({
  rating,
  ratings,
  hasReviewed,
  handleGiveReviewOpen,
}: {
  rating: number;
  ratings: number;
  hasReviewed: boolean;
  handleGiveReviewOpen: () => void;
}): JSX.Element {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let ratingString: string = "";
  if (!Number.isNaN(rating)) {
    ratingString = rating.toFixed(1);
  }
  return (
    <Grid item xs={12} sm={3}>
      <Grid
        container
        spacing={1}
        sx={{
          margin: 0,
          paddingLeft: "5px",
          justifyContent: isSmallScreen ? "left" : "right",
        }}
      >
        <Typography sx={{ paddingRight: "5px" }} aria-hidden="true">
          {ratingString}
        </Typography>
        {hasReviewed ? (
          <Rating name="showRating" value={rating} precision={0.5} readOnly />
        ) : (
          <Box onClick={handleGiveReviewOpen} sx={{ cursor: "pointer" }}>
            <Rating name="showRating" value={rating} precision={0.5} readOnly />
          </Box>
        )}
        <Typography
          sx={{ paddingLeft: "5px" }}
          aria-hidden="true"
          data-testid="ratings"
        >
          ({ratings})
        </Typography>
      </Grid>
    </Grid>
  );
}

// This function displays what is meant to be in the header
export default function DestinationHeader({
  destinationName,
  totalRating,
  amountOfRatings,
  hasReviewed,
  handleGiveReviewOpen,
}: {
  destinationName: string;
  totalRating: number;
  amountOfRatings: number;
  hasReviewed: boolean;
  handleGiveReviewOpen: () => void;
}): JSX.Element {
  const averageRating = totalRating / amountOfRatings;
  return (
    <CardContent>
      <Grid container spacing={2} tabIndex={0}>
        <DestinationName name={destinationName} />
        <DestinationRating
          rating={averageRating}
          ratings={amountOfRatings}
          hasReviewed={hasReviewed}
          handleGiveReviewOpen={handleGiveReviewOpen}
        />
      </Grid>
    </CardContent>
  );
}
