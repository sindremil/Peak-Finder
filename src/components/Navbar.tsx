import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  createTheme,
  ThemeProvider,
  TextField,
  InputAdornment,
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

interface SearchFieldProps {
  isDesktop: boolean;
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

function UserIcon(): JSX.Element {
  return (
    <IconButton color="inherit">
      <PersonOutline />
    </IconButton>
  );
}

function SearchField({ isDesktop }: SearchFieldProps): JSX.Element {
  if (isDesktop) {
    return (
      <Box
        component="div"
        sx={{
          height: "2.5rem",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          marginY: "auto",
          width: "100%",
        }}
      >
        <TextField
          placeholder="Destinasjon, land..."
          variant="standard"
          size="small"
          sx={{
            marginTop: 0.7,
            borderColor: "white",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{
                  color: "white",
                }}
              >
                <Search />
              </InputAdornment>
            ),
            style: { color: "white" },
          }}
        />
      </Box>
    );
  }

  return (
    <IconButton color="inherit">
      <Search />
    </IconButton>
  );
}

export default function Navbar() {
  // State variable for changing logo based on width
  const [isLogoCropped, setIsLogoCropped] = useState(false);
  // State variable for changing search field based on width
  const [isSearchFieldVisible, setIsSearchFieldVisible] = useState(true);

  // Effect for handling logo and search field change
  useEffect(() => {
    // Checks width and sets state variables accordingly
    const handleResize = () => {
      setIsLogoCropped(window.innerWidth < 600);
      setIsSearchFieldVisible(window.innerWidth >= 800);
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
          <Box
            component="div"
            marginRight={1}
            marginLeft="auto"
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <SearchField isDesktop={isSearchFieldVisible} />
            <UserIcon />
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
