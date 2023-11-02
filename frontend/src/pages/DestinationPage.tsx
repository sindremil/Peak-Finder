import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Destination from "../components/Destination";
import getDestinationPageProps from "../components/Destination/getDestinationPageProps";
import Navbar from "../components/Navbar";
import DestinationInterface from "../interfaces/Destination";
import DestinationResponse from "../interfaces/DestinationResponse";
import SetPageTitle from "../utils/SetPageTitle";

export default function DestinationPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { name } = useParams();
  const decodedName = decodeURI(name || "");

  const { isPending, isError, data } = useQuery<DestinationResponse>({
    queryKey: ["Resort", decodedName],
    queryFn: () => getDestinationPageProps(decodedName),
    staleTime: Infinity,
  });

  function setTitle(name: string): JSX.Element {
    return <SetPageTitle title={name || "Destination"} />;
  }

  function getDestinationContent(): JSX.Element | null {
    if (isPending) {
      return null;
    }

    if (isError) {
      return null;
    }

    const destination: DestinationInterface = data.getDestination;

    if (!destination) {
      return null;
    }

    return isSmallScreen ? (
      <>
        {setTitle(destination.Resort)}
        <Navbar />
        <Box>{<Destination destination={destination} />}</Box>
      </>
    ) : (
      <>
        {setTitle(destination.Resort)}
        <Navbar />
        <br />
        <Container maxWidth="md">
          {<Destination destination={destination} />}
        </Container>
        <br />
      </>
    );
  }
  return getDestinationContent();
}
