import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import Destination from "../components/Destination";
import DestinationProps from "../interfaces/DestinationProps";
import fischbach from "../assets/Fischbach.jpg";

export default function DestinationPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const destinationPageProps: DestinationProps = {
    destinationName: "Hemsedal",
    destinationImage: fischbach,
    country: "Norge",
    minHeight: 1000,
    maxHeight: 3300,
    passPrice: 500,
    beginner: 8,
    intermediate: 7,
    advanced: 6,
    gondolas: 2,
    chairlifts: 3,
    surfaceLifts: 4,
    snowPark: true,
    nightSki: false,
    certifed: true,
  };

  return isSmallScreen ? (
    <Box>
      <Destination destinationProps={destinationPageProps} />
    </Box>
  ) : (
    <>
      <br />
      <Container maxWidth="md">
        <Destination destinationProps={destinationPageProps} />
      </Container>
      <br />
    </>
  );
}
