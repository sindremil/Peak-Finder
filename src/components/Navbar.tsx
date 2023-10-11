import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Drawer,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
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
  // State is set to true when user presses the search icon on the mobile version
  // State is set to false when user clicks outside the drawer or the escape key
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Query state is currently only used to empty the search field
  // Will be used more in future deliverables when search functionality is implemented
  const [query, setQuery] = useState("");

  // Function for handling query change
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Hook used for search bar navigation
  const navigate = useNavigate();

  // Navigate to results page when user presses 'Enter' in search field
  // The search drawer on mobile is closed
  // The search field for desktop is emptied
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setIsDrawerOpen(false);
      setQuery("");
      navigate("/results");
    }
  };

  // JSX returned when on desktop
  if (isDesktop) {
    return (
      <TextField
        placeholder="Destinasjon, land..."
        variant="standard"
        onKeyDown={handleSearch}
        onChange={handleQueryChange}
        value={query}
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
              <Search />
            </InputAdornment>
          ),
          style: { color: "white" },
        }}
      />
    );
  }

  // JSX returned when on mobile
  return (
    <>
      <IconButton
        color="inherit"
        sx={{ paddingRight: 0 }}
        onClick={() => setIsDrawerOpen(true)}
      >
        <Search sx={{ ...iconSize }} />
      </IconButton>
      <Drawer
        anchor="top"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <TextField
          placeholder="Destinasjon, land..."
          variant="outlined"
          onKeyDown={handleSearch}
          onChange={handleQueryChange}
          value={query}
          size="small"
          sx={{ padding: 2 }}
          InputProps={{
            inputProps: {
              "aria-label": "Søkefelt",
            },
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{
                  color: "black",
                }}
              >
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Drawer>
    </>
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
