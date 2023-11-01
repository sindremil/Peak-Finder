import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import Destination from "../components/Destination";
import DestinationProps from "../interfaces/DestinationProps";

export default function DestinationPage({destinationProps}: {destinationProps: DestinationProps}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return isSmallScreen ? (
    <Box>
      <Destination destinationProps={destinationProps} />
    </Box>
  ) : (
    <>
      <br />
      <Container maxWidth="md">
        <Destination destinationProps={destinationProps} />
      </Container>
      <br />
    </>
  );
}
