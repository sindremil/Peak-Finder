import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import Destination from "../components/Destination";

export default function DestinationPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return isSmallScreen ? (
    <>
      <Box>
        <Destination destinationName="Hemsedal" />
      </Box>
      <br />
    </>
  ) : (
    <>
      <br />
      <Container>
        <Destination destinationName="Hemsedal" />
      </Container>
      <br />
    </>
  );
}
