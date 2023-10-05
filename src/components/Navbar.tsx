import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Search, PersonOutline } from "@mui/icons-material";
import logo from "../assets/logos/logo-no-background.svg";
import logocropped from "../assets/logos/logo-no-background-cropped.svg";

// Custom theme to change the size of the icons
const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "2rem",
        },
      },
    },
  },
});

interface LogoProps {
  logoPath: string;
}

function Logo({ logoPath }: LogoProps): JSX.Element {
  return (
    <Box
      component="img"
      sx={{
        height: "2.5rem",
      }}
      alt="Peak Finder logo"
      src={logoPath}
      tabIndex={0}
      role="button"
    />
  );
}

function Icons(): JSX.Element {
  return (
    <Box component="div" marginRight={1} marginLeft="auto">
      <IconButton color="inherit">
        <Search />
      </IconButton>
      <IconButton color="inherit">
        <PersonOutline />
      </IconButton>
    </Box>
  );
}

export default function Navbar() {
  // State variable for changing logo based on aspect ratio
  const [isLogoCropped, setIsLogoCropped] = useState(false);

  // Effect for handling logo change
  useEffect(() => {
    // Checks aspect ratio and changes state with respect to the threshold
    const handleResize = () => {
      setIsLogoCropped(window.innerWidth < 600);
    };

    // handleResize function is each time window gets resized
    window.addEventListener("resize", handleResize);

    // Initial call to handleResize
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Logo logoPath={isLogoCropped ? logocropped : logo} />
          <Icons />
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
