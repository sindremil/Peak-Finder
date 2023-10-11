import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DestinationPage from "./pages/DestinationPage";
import Navbar from "./components/Navbar";
import SetPageTitle from "./utils/SetPageTitle";
import Result from "./pages/ResultPage";
import HomePage from "./pages/HomePage";

function App() {
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
          path="/destination"
          element={
            <>
              <SetPageTitle title="Destinasjon " />
              <Navbar />
              <DestinationPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
