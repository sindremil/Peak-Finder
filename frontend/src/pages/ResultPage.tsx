import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Breadcrumbs,
  Container,
  Drawer,
  Fab,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Filter from "../components/Filter/Filter";
import Navbar from "../components/Navbar";
import Result from "../components/Result/Result";
import { useAppSelector } from "../hooks";
import useDebounce from "../hooks/useDebounce";
import SetPageTitle from "../utils/SetPageTitle";

// This function creates bread crumbs used for navigation between pages
function ResultsBreadCrumbs(): JSX.Element {
  return (
    <Grid item xs={12}>
      <Breadcrumbs aria-label="Navigasjon">
        <Link underline="hover" color="inherit" href="/">
          Hjem
        </Link>
        <Typography color="text.primary">Resultater</Typography>
      </Breadcrumbs>
    </Grid>
  );
}

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
        <ResultsBreadCrumbs />
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
