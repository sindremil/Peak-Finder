import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import Destination from "../components/Destination";

export default function DestinationPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return isSmallScreen ? (
    // Temporary DRY violation whilst developing
    <>
      <Box>
        <Destination destinationName="Hemsedal" />
      </Box>
      <br />
    </>
  ) : (
    <>
      <br />
      <Container maxWidth="md">
        <Destination destinationName="Saalbach-Hinterglem-Leogang-Fieberrunn (Skicircus)" />
      </Container>
      <br />
    </>
  );
}
