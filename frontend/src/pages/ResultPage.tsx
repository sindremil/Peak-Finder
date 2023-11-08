import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, Drawer, Fab } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import Filter from "../components/Filter/Filter";
import Navbar from "../components/Navbar";
import Result from "../components/Result/Result";
import { useAppSelector } from "../hooks";
import useDebounce from "../hooks/useDebounce";
import SetPageTitle from "../utils/SetPageTitle";

export default function ResultPage() {
  const filter = useAppSelector((state) => state.filter);
  const country = useParams().country ?? "";
  const debouncedFilter = useDebounce(filter, 500);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <SetPageTitle title={country || "Result"} />
      <Navbar />
      <Container sx={{ paddingTop: "24px", paddingBottom: "24px" }}>
        {BreadCrumbs()}
      </Container>
      <Fab
        aria-label="filter"
        variant="extended"
        sx={{ position: "fixed", bottom: "2rem", right: "2rem" }}
        onClick={handleDrawer}
      >
        <FilterListIcon />
        Filtrer
      </Fab>
      <Result country={country} debouncedFilter={debouncedFilter} />
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
