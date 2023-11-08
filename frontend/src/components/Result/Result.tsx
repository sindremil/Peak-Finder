import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import FilterState from "../../../../shared/types/FilterState";
import getFilteredDestinations from "../../api/getFilteredDestinations";
import DestinationCard from "../../interfaces/DestinationCard";
import DestinationCardProps from "../../interfaces/DestinationCardProps";
import DestinationCardResponse from "../../interfaces/DestinationCardResponse";
import addResult from "../../utils/addResult";

function addResults(results: DestinationCard[]): JSX.Element[] {
  const resultArray: JSX.Element[] = [];

  results.forEach((destinationCard: DestinationCard) => {
    const {
      Resort,
      Country,
      HighestPoint,
      LowestPoint,
      BeginnerSlope,
      IntermediateSlope,
      DifficultSlope,
      TotalLifts,
    } = destinationCard;
    const imagePath = `../images/resorts/${Resort.toLowerCase().replace(
      /[^a-z]/g,
      "",
    )}.jpg`;
    const imageAlt = `Bilde av ${Resort}`;

    const destinationCardProps: DestinationCardProps = {
      name: Resort,
      country: Country,
      highestPoint: HighestPoint,
      lowestPoint: LowestPoint,
      beginner: BeginnerSlope,
      intermediate: IntermediateSlope,
      advanced: DifficultSlope,
      lifts: TotalLifts,
      imageSrc: imagePath,
      imageAlt,
    };
    resultArray.push(addResult(destinationCardProps));
  });

  return resultArray;
}

export default function Result({
  country,
  debouncedFilter,
}: {
  country: string;
  debouncedFilter: FilterState;
}): JSX.Element {
  const {
    isPending,
    isError,
    data,
    fetchNextPage,
    hasNextPage, // This indicates if there's a next page available
    isFetchingNextPage, // This indicates if the next page is currently being fetched
  } = useInfiniteQuery<DestinationCardResponse>({
    queryKey: ["country", decodeURIComponent(country), debouncedFilter],
    queryFn: ({ pageParam }) =>
      getFilteredDestinations(
        decodeURIComponent(country),
        debouncedFilter,
        pageParam,
      ),
    initialPageParam: "0",
    getNextPageParam: (lastPage) => {
      const lastEdge = lastPage.getFilteredDestinations.edges;
      return lastEdge.length > 0
        ? lastEdge[lastEdge.length - 1].cursor
        : undefined;
    },
    staleTime: Infinity,
  });

  const getResults = (): DestinationCard[] | null => {
    if (isPending || isError) {
      return null;
    }

    const destinations = data.pages.map(
      (page) => page.getFilteredDestinations.edges,
    );
    if (!destinations) {
      return [];
    }

    const nodes = destinations.flatMap((destination) =>
      destination.map((edge) => edge.node),
    );
    return nodes;
  };

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  function getErrorOrEmptyContent(displayString: string): JSX.Element {
    return (
      <Container sx={{ marginBottom: "2rem" }}>
        <Grid container spacing={12} sx={{ marginTop: "0" }}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {displayString}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }

  const results = getResults();

  if (results === null) {
    return getErrorOrEmptyContent("Laster inn resultater...");
  }
  if (results.length > 0) {
    return (
      <Container sx={{ marginBottom: "2rem" }}>
        <Grid container spacing={4}>
          {addResults(results)}
        </Grid>
        <Box display="flex" justifyContent="center" my={2}>
          <Button
            variant="contained"
            size="large"
            onClick={handleLoadMore}
            // Disable button if there's no next page or if it's currently fetching
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage ? "Laster..." : "Last inn mer"}
          </Button>
        </Box>
      </Container>
    );
  }
  return getErrorOrEmptyContent("Ingen resultater samsvarte med søket");
}
