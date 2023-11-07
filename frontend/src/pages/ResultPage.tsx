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
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import getDestinationsByCountry from "../api/getDestinationsByCountry";
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

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const { country } = useParams(); // Get the selected country from the URL params
  const decodedCountry = decodeURI(country || "");

  const { isPending, isError, data, error } = useQuery<DestinationCardResponse>(
    {
      queryKey: ["Country", decodedCountry, 9],
      queryFn: () => getDestinationsByCountry(decodedCountry, 9),
      staleTime: Infinity,
    },
  );

  function getDestinations(): JSX.Element | null {
    if (isPending) {
      return <Navbar />;
    }

    if (isError) {
      return <Alert severity="error">{error.message}</Alert>;
    }

    const destinations: DestinationCard[] = data.getDestinationsByCountry;

    if (!destinations) {
      return null;
    }

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
            {destinations && addResults(destinations)}
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
  return getDestinations();
}
