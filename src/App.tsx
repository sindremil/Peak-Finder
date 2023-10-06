import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import DestinationPage from "./pages/DestinationPage";
import DestinationCard from "./components/DestinationCard";
import DestinationCardProps from "./interfaces/DestinationCardProps";
import hemsedalImage from "./assets/hemsedal.jpg";

// Mock values
const mockDestinationCardProps: DestinationCardProps = {
  name: "Hemsedal",
  imageSrc: hemsedalImage,
  imageAlt: "Mock Image Alt",
  lowestPoint: 1030,
  highestPoint: 2479,
  beginner: 30,
  intermediate: 60,
  advanced: 10,
  lifts: 15,
};

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DestinationPage />
      <DestinationCard destinationCardProps={mockDestinationCardProps} />
    </ThemeProvider>
    </>
  );
}

export default App;
