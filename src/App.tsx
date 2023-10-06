import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import DestinationPage from "./pages/DestinationPage"

function App() {
  const theme = createTheme();
  
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <DestinationPage />
      </ThemeProvider>
  );
}

export default App;
