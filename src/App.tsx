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
    <HomePage />
    // <Router basename="/project2">
    //   <Navbar />
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         <>
    //           <SetPageTitle title="Results" />
    //           <Result />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/destination"
    //       element={
    //         <>
    //           <SetPageTitle title="Destination" />
    //           <DestinationPage />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/login"
    //       element={
    //         <>
    //           <SetPageTitle title="Login" />
    //           <LoginPage />
    //         </>
    //       }
    //     />
    //     <Route
    //       path="/create-user"
    //       element={
    //         <>
    //           <SetPageTitle title="Create User" />
    //           <CreateUserPage />
    //         </>
    //       }
    //     />
    //   </Routes>
    // </Router>
  );
}

export default App;
