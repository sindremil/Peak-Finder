import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import Destination from "../components/Destination";

export default function DestinationPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Temporary DRY violation whilst developing
  return isSmallScreen ? (
    <Box>
      <Destination destinationName="Hemsedal" />
    </Box>
  ) : (
    <>
      <br />
      <Container maxWidth="md">
        <Destination destinationName="Hemsedal" />
      </Container>
      <br />
    </>
  );
}
