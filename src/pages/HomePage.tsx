import { Box, Container, useMediaQuery } from "@mui/material";
import logo from "../assets/logos/logo-color.svg";
import Searchbar from "../components/Searchbar";

function Logo(): JSX.Element {
  // Media query for mobile that increases size of logo
  const isMobile = useMediaQuery("(max-aspect-ratio: 3/4)");

  return (
    <Box
      role="img"
      component="img"
      alt="Peak Finder logo"
      src={logo}
      sx={{
        width: isMobile ? "80%" : "50%",
      }}
    />
  );
}

export default function HomePage(): JSX.Element {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "15rem",
      }}
    >
      <Logo />
      <Searchbar />
    </Container>
  );
}
