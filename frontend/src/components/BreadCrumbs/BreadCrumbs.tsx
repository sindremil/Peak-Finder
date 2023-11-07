import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { setSearchTerm } from "../Searchbar/searchSlice";

// Return different Breadcrumbs based on whether the user
// is on the Results page or the Destination page and
// whether the Destination page was routed through Results page or search
function createBreadcrumbs(
  isFromResult?: boolean,
  country?: string,
): JSX.Element {
  return (
    <Breadcrumbs aria-label="Navigasjon">
      <MuiLink component={Link} underline="hover" color="inherit" to="/">
        Hjem
      </MuiLink>
      {country && isFromResult && (
        <MuiLink
          component={Link}
          underline="hover"
          color="inherit"
          to={`/results/${encodeURIComponent(country)}`}
        >
          Resultater
        </MuiLink>
      )}
      {(country && (
        <Typography color="text.primary">Destinasjon</Typography>
      )) ?? <Typography color="text.primary">Resultater</Typography>}
    </Breadcrumbs>
  );
}

export default function BreadCrumbs(
  isFromResult?: boolean,
  country?: string,
): JSX.Element {
  const dispatch = useAppDispatch();

  // Clearing the search term when the user navigates to a new page
  dispatch(setSearchTerm(""));

  return <>{createBreadcrumbs(isFromResult, country)}</>;
}
