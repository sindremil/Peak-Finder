import { AppBar, Toolbar, Box } from "@mui/material";
import { useEffect, useState } from "react";
import logo from "../assets/logos/logo-no-background.svg";
import logocropped from "../assets/logos/logo-no-background-cropped.svg";

export default function Navbar() {
  // State variable for changing logo based on aspect ratio
  const [isLogoCropped, setIsLogoCropped] = useState(false);

  // Effect for handling logo change
  useEffect(() => {
    // Checks aspect ratio and changes state with respect to the threshold
    const handleResize = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const threshold = 1;
      setIsLogoCropped(threshold > aspectRatio);
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
        <Box
          component="img"
          sx={{
            height: "2.5rem",
          }}
          alt="Peak Finder logo"
          src={isLogoCropped ? logocropped : logo}
        />
      </Toolbar>
    </AppBar>
  );
}
