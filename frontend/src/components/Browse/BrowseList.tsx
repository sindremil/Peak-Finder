import { Alert, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import getCountries from "../../api/getCountries";
import CountriesResponse from "../../interfaces/CountriesResponse";

function CountryListItems({ countries }: { countries: string[] }): JSX.Element {
  return (
    <>
      {countries.map((country) => (
        <ListItem key={encodeURIComponent(country)} disableGutters disablePadding>
          <ListItemButton
            component={Link}
            to={`/results/${encodeURIComponent(country)}`}
          >
            <ListItemText>{country}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
}

export default function BrowseList(): JSX.Element | null {
  // State for the selected country
  const { isPending, isError, data, error } = useQuery<CountriesResponse>({
    queryKey: ["Countries"],
    queryFn: () => getCountries(),
    staleTime: Infinity,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  const countries: string[] = data.getCountries;

  if (!countries) {
    return null;
  }

  return <CountryListItems countries={countries} />;
}
