import { Box, Container, useMediaQuery } from "@mui/material";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logos/logo-color.svg";
import Browse from "../components/Browse/Browse";
import { resetFilter } from "../components/Filter/filterSlice";
import Searchbar from "../components/Searchbar/Searchbar";
import { useAppDispatch } from "../hooks";

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
  const dispatch = useAppDispatch();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(resetFilter());

    if (location.state && location.state.isRedirect) {
      // Focus the input element when redirected
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [dispatch, location.state]);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10rem",
      }}
    >
      <Logo />
      <Searchbar inputRef={inputRef} />
      <br />
      <Browse />
    </Container>
  );
}
