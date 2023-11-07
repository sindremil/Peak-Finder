import { Alert, Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import getDestinationPageProps from "../api/getDestinationPageProps";
import Destination from "../components/Destination/Destination";
import Navbar from "../components/Navbar";
import DestinationInterface from "../interfaces/Destination";
import DestinationResponse from "../interfaces/DestinationResponse";
import SetPageTitle from "../utils/SetPageTitle";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";

function addTitleAndNavbar(title: string): JSX.Element {
  return (
    <>
      <SetPageTitle title={title || "Destination"} />
      <Navbar />
    </>
  );
}

export default function DestinationPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { name } = useParams();
  const decodedName = decodeURI(name || "");
  const location = useLocation();

  const { isPending, isError, data, error } = useQuery<DestinationResponse>({
    queryKey: ["Resort", decodedName],
    queryFn: () => getDestinationPageProps(decodedName),
    staleTime: Infinity,
  });

  const getDestinationContent = (): JSX.Element | null => {
    if (isPending) {
      return <Navbar />;
    }

    if (isError) {
      return <Alert severity="error">{error.message}</Alert>;
    }

    const destination: DestinationInterface = data.getDestination;

    if (!destination) {
      return null;
    }

    const { isFromResult } = location.state || { isFromResult: false };
    return isSmallScreen ? (
      <>
        {addTitleAndNavbar(destination.Resort)}
        <Box>
          {BreadCrumbs(isFromResult, destination.Country)}
          <Destination destination={destination} />
        </Box>
      </>
    ) : (
      <>
        {addTitleAndNavbar(destination.Resort)}
        <br />
        <Container maxWidth="md">
          {BreadCrumbs(isFromResult, destination.Country)}
          <Destination destination={destination} />
        </Container>
        <br />
      </>
    );
  };
  return getDestinationContent();
}
