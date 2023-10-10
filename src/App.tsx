import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DestinationPage from "./pages/DestinationPage";
import Navbar from "./components/Navbar";
import SetPageTitle from "./utils/SetPageTitle";
import Result from "./pages/Result";
import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router basename="/project2">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SetPageTitle title="Home" />
              <HomePage />
            </>
          }
        />
        <Route
          path="/results"
          element={
            <>
              <SetPageTitle title="Results" />
              <Navbar />
              <Result />
            </>
          }
        />
        <Route
          path="/destination"
          element={
            <>
              <SetPageTitle title="Destination" />
              <Navbar />
              <DestinationPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <SetPageTitle title="Login" />
              <Navbar />
              <LoginPage />
            </>
          }
        />
        <Route
          path="/create-user"
          element={
            <>
              <SetPageTitle title="Create User" />
              <Navbar />
              <CreateUserPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
