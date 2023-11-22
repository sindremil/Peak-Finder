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
    )}.webp`;
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
    error,
    data,
    fetchNextPage,
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
    getNextPageParam: (lastPage) =>
      lastPage.getFilteredDestinations.pageInfo.endCursor,
    staleTime: Infinity,
  });

  const hasNextPage = (): boolean => {
    if (data) {
      return data.pages[data.pages.length - 1].getFilteredDestinations.pageInfo
        .hasNextPage;
    }
    // Returns true if the data doesn't exist yet
    return true;
  };

  const getResults = (): DestinationCard[] | null | Error => {
    if (isPending) {
      return null;
    }

    if (isError) {
      return error;
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
    if (hasNextPage()) {
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

  if (results instanceof Error) {
    return getErrorOrEmptyContent(
      "Det oppstod en feil under lasting av resultater",
    );
  }

  if (results.length > 0) {
    return (
      <Container sx={{ marginBottom: "2rem" }}>
        <Grid container spacing={4}>
          {addResults(results)}
        </Grid>
        <Box display="flex" justifyContent="center" my={2}>
          {hasNextPage() && (
            <Button variant="contained" size="large" onClick={handleLoadMore}>
              {isFetchingNextPage ? "Laster..." : "Last inn mer"}
            </Button>
          )}
        </Box>
      </Container>
    );
  }
  return getErrorOrEmptyContent("Ingen resultater samsvarte med søket");
}
