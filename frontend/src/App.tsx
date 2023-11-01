import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DestinationPage from "./pages/DestinationPage";
import Navbar from "./components/Navbar";
import SetPageTitle from "./utils/SetPageTitle";
import Result from "./pages/ResultPage";
import HomePage from "./pages/HomePage";
import DestinationProps from "./interfaces/DestinationProps";
import fischbach from "./assets/Fischbach.jpg";


function getDestinationProps(): DestinationProps {
  return {
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
}

function App() {
  const destinationProps = getDestinationProps();
  return (
    <Router basename="/project2">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SetPageTitle title="Hjem " />
              <HomePage />
            </>
          }
        />
        <Route
          path="/results"
          element={
            <>
              <Navbar />
              <SetPageTitle title="Resultater " />
              <Result />
            </>
          }
        />
        <Route
          path={`/${destinationProps.destinationName}`}
          element={
            <>
              <SetPageTitle title={destinationProps.destinationName} />
              <Navbar />
              <DestinationPage destinationProps={destinationProps}/>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
