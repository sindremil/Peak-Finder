import { Alert, Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Destination from "../components/Destination/Destination";
import getDestinationPageProps from "../api/getDestinationPageProps";
import Navbar from "../components/Navbar";
import DestinationInterface from "../interfaces/Destination";
import DestinationResponse from "../interfaces/DestinationResponse";
import SetPageTitle from "../utils/SetPageTitle";

export default function DestinationPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { name } = useParams();
  const decodedName = decodeURI(name || "");

  const { isPending, isError, data, error } = useQuery<DestinationResponse>({
    queryKey: ["Resort", decodedName],
    queryFn: () => getDestinationPageProps(decodedName),
    staleTime: Infinity,
  });

  const addTitleAndNavbar = (title: string): JSX.Element => {
    return (
      <>
        <SetPageTitle title={title || "Destination"} />
        <Navbar />
      </>
    );
  };

  const getDestinationContent = (): JSX.Element | null => {
    if (isPending) {
      return <p>Loading...</p>;
    }

    if (isError) {
      return <Alert severity="error">{error.message}</Alert>;
    }

    const destination: DestinationInterface = data.getDestination;

    if (!destination) {
      return null;
    }

    return isSmallScreen ? (
      <>
        {addTitleAndNavbar(destination.Resort)}
        <Box>
          <Destination destination={destination} />
        </Box>
      </>
    ) : (
      <>
        {addTitleAndNavbar(destination.Resort)}
        <br />
        <Container maxWidth="md">
          <Destination destination={destination} />
        </Container>
        <br />
      </>
    );
  };
  return getDestinationContent();
}
