import { Alert, Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import getDestinationPageProps from "../api/getDestinationPageProps";
import Destination from "../components/Destination/Destination";
import Navbar from "../components/Navbar/Navbar";
import DestinationInterface from "../interfaces/Destination";
import DestinationResponse from "../interfaces/DestinationResponse";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import { useAppDispatch } from "../hooks";
import { setSearchTerm } from "../components/Searchbar/searchSlice";
import usePageTitle from "../hooks/usePageTitle";
import DestinationSkeleton from "../components/Destination/DestinationSkeleton";

export default function DestinationPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { name } = useParams();
  const decodedName = decodeURI(name || "");
  const location = useLocation();
  const dispatch = useAppDispatch();
  usePageTitle(decodedName);

  const { isPending, isError, data, error } = useQuery<DestinationResponse>({
    queryKey: ["Resort", decodedName],
    queryFn: () => getDestinationPageProps(decodedName),
    staleTime: Infinity,
  });

  const getDestinationContent = (): JSX.Element | null => {
    if (isPending) {
      return <DestinationSkeleton isSmallScreen={isSmallScreen} />;
    }

    if (isError) {
      return <Alert severity="error">{error.message}</Alert>;
    }

    const destination: DestinationInterface = data.getDestination;

    if (!destination) {
      return null;
    }

    const { isFromResult } = location.state || { isFromResult: false };
    if (!isFromResult) {
      dispatch(setSearchTerm(""));
    }

    // Always scroll to the top of the page
    window.scrollTo(0, 0);

    return isSmallScreen ? (
      <>
        <Navbar />
        <Box>
          {BreadCrumbs({
            country: destination.Country,
            destination: destination.Resort,
            isFromResult,
            isSmallScreen,
          })}
          <Destination destination={destination} />
        </Box>
      </>
    ) : (
      <>
        <Navbar />
        <br />
        <Container maxWidth="md">
          {BreadCrumbs({
            country: destination.Country,
            destination: destination.Resort,
            isFromResult,
          })}
          <Destination destination={destination} />
        </Container>
        <br />
      </>
    );
  };
  return getDestinationContent();
}
