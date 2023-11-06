import { Alert, ListItemButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import getCountries from "../../api/getCountries";
import CountriesResponse from "../../interfaces/CountriesResponse";

function CountryListItems({ countries }: { countries: string[] }): JSX.Element {
  return (
    <>
      {countries.map((country) => (
        <ListItemButton
          key={encodeURI(country)}
          component={Link}
          to={`/results/${encodeURI(country)}`}
        >
          {country}
        </ListItemButton>
      ))}
    </>
  );
}

export default function BrowseList(): JSX.Element | null {
  // State for the selected country
  const { isPending, isError, data, error } = useQuery<CountriesResponse>({
    queryKey: [],
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
