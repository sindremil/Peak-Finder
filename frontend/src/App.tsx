import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DestinationPage from "./pages/DestinationPage";
import HomePage from "./pages/HomePage";
import Result from "./pages/ResultPage";
import SetPageTitle from "./utils/SetPageTitle";

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
        <Route path="/results/:country" element={<Result />} />
        <Route path="/:name" element={<DestinationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
