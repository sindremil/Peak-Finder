import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Return different Breadcrumbs based on whether the user
// is on the Results page or the Destination page and
// whether the Destination page was routed through Results page or search
interface BreadCrumbsProps {
  country?: string;
  destination?: string;
  isResult?: boolean;
  isFromResult?: boolean;
}

export default function BreadCrumbs({
  country,
  destination,
  isResult,
  isFromResult,
}: BreadCrumbsProps): JSX.Element {
  return (
    <Breadcrumbs aria-label="Navigasjon">
      <MuiLink component={Link} underline="hover" color="inherit" to="/">
        Hjem
      </MuiLink>
      {!isResult && isFromResult && (
        <MuiLink
          component={Link}
          underline="hover"
          color="inherit"
          to={`/results/${encodeURIComponent(country || "")}`}
        >
          {country}
        </MuiLink>
      )}
      {!isResult && <Typography color="text.primary">{destination}</Typography>}
      {isResult && <Typography color="text.primary">{country}</Typography>}
    </Breadcrumbs>
  );
}

BreadCrumbs.defaultProps = {
  country: "",
  destination: "",
  isResult: false,
  isFromResult: false,
} as BreadCrumbsProps;
