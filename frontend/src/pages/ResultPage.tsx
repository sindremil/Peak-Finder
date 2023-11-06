import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Alert,
  Breadcrumbs,
  Container,
  Drawer,
  Fab,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import getFilteredDestinations from "../api/getFilteredDestinations";
import Filter from "../components/Filter/Filter";
import Navbar from "../components/Navbar";
import DestinationCard from "../interfaces/DestinationCard";
import DestinationCardProps from "../interfaces/DestinationCardProps";
import DestinationCardResponse from "../interfaces/DestinationCardResponse";
import SetPageTitle from "../utils/SetPageTitle";
import addResult from "../utils/addResult";

// This function creates bread crumbs used for navigation between pages
function ResultsBreadCrumbs(): JSX.Element {
  return (
    <Grid item xs={12}>
      <Breadcrumbs aria-label="Navigasjon">
        <Link underline="hover" color="inherit" href="/">
          Hjem
        </Link>
        <Typography color="text.primary">Resultater</Typography>
      </Breadcrumbs>
    </Grid>
  );
}
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
    const destinationCardProps: DestinationCardProps = {
      name: Resort,
      country: Country,
      highestPoint: HighestPoint,
      lowestPoint: LowestPoint,
      beginner: BeginnerSlope,
      intermediate: IntermediateSlope,
      advanced: DifficultSlope,
      lifts: TotalLifts,
      imageSrc: "https://picsum.photos/200/300",
      imageAlt: "Placeholder image",
    };
    resultArray.push(addResult(destinationCardProps));
  });

  return resultArray;
}
export default function Result() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const cursor = useRef<string>("")

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const { country } = useParams(); // Get the selected country from the URL params
  const decodedCountry = decodeURI(country || "");

  const { isPending, isError, data, error } = useInfiniteQuery<DestinationCardResponse>(
    {
      queryKey: ["Country", decodedCountry, cursor.current],
      queryFn: () => getFilteredDestinations(decodedCountry, cursor.current),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const lastEdge = lastPage.getFilteredDestinations.edges;
        // If the last page has fewer than the max number of results, there may be no more pages.
        return lastEdge.length > 0 ? lastEdge[lastEdge.length - 1].cursor : undefined;
      },
      staleTime: Infinity,
    }
  );

  const getDestinations = (): JSX.Element | null => {
    if (isPending) {
      return <Navbar />;
    }

    if (isError) {
      return <Alert severity="error">{error.message}</Alert>;
    }

    const destinations = data.pages.map((page) => page.getFilteredDestinations.edges);

    if (!destinations) {
      return null;
    }

    const nodes = destinations.flatMap((destination) => destination.map((edge) => edge.node));

    return <>{addResults(nodes)}</>;
  };
  return (
    <>
      <SetPageTitle title={country || "Resultater "} />
      <Navbar />
      <Container sx={{ marginBottom: "2rem" }}>
        <Fab
          aria-label="filter"
          variant="extended"
          sx={{ position: "fixed", bottom: "2rem", right: "2rem" }}
          onClick={handleDrawer}
        >
          <FilterListIcon />
          Filtrer
        </Fab>
        <Grid container spacing={4} sx={{ marginTop: "0.2vw" }}>
          <ResultsBreadCrumbs />
          {getDestinations()}
        </Grid>
        <Drawer
          anchor="left"
          open={drawerOpen}
          sx={{ display: "flex", flexDirection: "column" }}
          onClose={handleDrawer}
          // To change the width of the drawer, the paper props must be manipulated
          PaperProps={{
            sx: {
              maxWidth: "300px",
            },
          }}
        >
          <Filter />
        </Drawer>
      </Container>
    </>
  );
}
