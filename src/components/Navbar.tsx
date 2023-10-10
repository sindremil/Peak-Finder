import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../assets/logos/logo-no-background.svg";
import logoCropped from "../assets/logos/logo-no-background-cropped.svg";

// This const controls the size of all icons that belong to this component
const iconSize: { fontSize: string } = {
  fontSize: "2.5rem",
};

interface LogoProps {
  logoPath: string;
}

function Logo({ logoPath }: LogoProps): JSX.Element {
  return (
    <Box component={Link} to="/">
      <Box
        component="img"
        alt="Peak Finder logo"
        src={logoPath}
        tabIndex={0}
        role="button"
        sx={{
          height: "2.5rem",
        }}
      />
    </Box>
  );
}
interface SearchFieldProps {
  isDesktop: boolean;
}

function SearchField({ isDesktop }: SearchFieldProps): JSX.Element {
  if (isDesktop) {
    return (
      <TextField
        placeholder="Destinasjon, land..."
        variant="standard"
        size="small"
        sx={{
          marginTop: 0.7,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{
                color: "white",
              }}
            >
              <Search sx={{ ...iconSize }} />
            </InputAdornment>
          ),
          style: { color: "white" },
        }}
      />
    );
  }

  return (
    <IconButton color="inherit" sx={{ paddingRight: "0" }}>
      <Search sx={{ ...iconSize }} />
    </IconButton>
  );
}

export default function Navbar(): JSX.Element {
  // State for changing logo based on width
  const [isLogoCropped, setIsLogoCropped] = useState(false);
  // State for changing search field based on width
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
    <AppBar position="static">
      <Toolbar>
        <Logo logoPath={isLogoCropped ? logoCropped : logo} />
        <Box
          component="div"
          marginRight={1}
          marginLeft="auto"
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            marginRight: 0,
          }}
        >
          <SearchField isDesktop={isSearchFieldVisible} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
