import { Box, Container } from "@mui/material";
import logo from "../assets/logos/logo-black.svg";
import Searchbar from "../components/Searchbar";

function Logo(): JSX.Element {
  return (
    <Box
      component="img"
      alt="Peak Finder logo"
      src={logo}
      tabIndex={0}
      role="button"
      sx={{
        width: "80%",
      }}
    />
  );
}

export default function HomePage() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "9rem",
      }}
    >
      <Logo />
      <Searchbar />
    </Container>
  );
}
