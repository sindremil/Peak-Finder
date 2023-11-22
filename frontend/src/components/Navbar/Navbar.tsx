import { Search } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoCropped from "../assets/logos/logo-no-background-cropped.svg";
import logo from "../assets/logos/logo-no-background.svg";

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
        sx={{
          height: "2.5rem",
        }}
      />
    </Box>
  );
}

function SearchIcon(): JSX.Element {
  return (
    <IconButton
      component={Link}
      to="/"
      state={{ isRedirect: true }}
      aria-label="Søk"
      sx={{ color: "white" }}
    >
      <Search sx={{ ...iconSize }} />
    </IconButton>
  );
}

export default function Navbar(): JSX.Element {
  // State for changing logo based on width
  const [isLogoCropped, setIsLogoCropped] = useState(false);

  // Effect for handling logo change
  useEffect(() => {
    // Checks width and sets state accordingly
    const handleResize = () => {
      setIsLogoCropped(window.innerWidth < 600);
    };

    // handleResize function is called each time window gets resized
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
          <SearchIcon />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
