import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { darkThemeConfig, lightThemeConfig } from "./configs/themeConfig";
import { useAppSelector } from "./hooks/hooks";
import DestinationPage from "./pages/DestinationPage";
import HomePage from "./pages/HomePage";
import Result from "./pages/ResultPage";

function App() {
  const theme = useAppSelector((state) => state.theme.theme);
  return (
    <ThemeProvider
      theme={createTheme(theme === "dark" ? lightThemeConfig : darkThemeConfig)}
    >
      <CssBaseline />
      <Router basename="/project2">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results/:country" element={<Result />} />
          <Route path="/:name" element={<DestinationPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
