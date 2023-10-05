import { CssBaseline } from "@mui/material";
import DestinationCard from "./components/DestinationCard";
import DestinationCardProps from "./interfaces/DestinationCardProps";

// Mock values
const mockDestinationCardProps: DestinationCardProps = {
  name: "Mock Destination",
  imageSrc: "test",
  imageAlt: "Mock Image Alt",
  lowestPoint: 1000,
  highestPoint: 2000,
  beginner: 30,
  intermediate: 60,
  advanced: 10,
  lifts: 15,
};

function App() {
  return (
    <>
      <CssBaseline />
      <DestinationCard destinationCardProps={mockDestinationCardProps} />
    </>
  );
}

export default App;
