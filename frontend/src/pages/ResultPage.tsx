import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, Drawer, Fab, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../features/BreadCrumbs/BreadCrumbs";
import Filter from "../features/Filter/Filter";
import Navbar from "../features/Navbar/Navbar";
import Result from "../features/Result/Result";
import usePageTitle from "../hooks/usePageTitle";

export default function ResultPage() {
  const country = useParams().country ?? "";
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  usePageTitle(country);

  // Scrolls to the previous position when the page is loaded
  const pos = parseInt(sessionStorage.getItem("resultPageScrollY") || "0", 10);
  useEffect(() => {
    window.scrollTo(0, pos);
  }, [pos]);

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Navbar />
      <Container sx={{ paddingTop: "24px", paddingBottom: "24px" }}>
        {BreadCrumbs({ country, isResult: true })}
      </Container>
      <Fab
        aria-label="filter"
        variant="extended"
        color="primary"
        sx={{
          position: "fixed",
          bottom: "2rem",
          right: { xs: "1.25rem", sm: "6.5rem" },
        }}
        onClick={handleDrawer}
      >
        <FilterListIcon />
        {isSmallScreen ? "" : "Filtrer eller sorter"}
      </Fab>
      <Result country={country} />
      <Drawer
        anchor="left"
        open={drawerOpen}
        sx={{ display: "flex", flexDirection: "column" }}
        onClose={handleDrawer}
        // To change the width of the drawer, the paper props must be manipulated
        PaperProps={{
          sx: {
            maxWidth: "300px",
          },
        }}
      >
        <Filter />
      </Drawer>
    </>
  );
}
