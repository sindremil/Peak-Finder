import {
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import getCountries from "../../api/getCountries";
import CountriesResponse from "../../interfaces/CountriesResponse";

function createSelect({
  countries,
  handleMenuItemClick,
}: {
  countries: string[];
  handleMenuItemClick(country: string): void;
}): JSX.Element {
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="browseSelectLabel">Land</InputLabel>
      <Select
        labelId="browseSelectLabel"
        label="Land"
        defaultValue=""
        data-testid="browseSelect"
      >
        {countries.map((country) => (
          <MenuItem
            key={encodeURIComponent(country)}
            value={country}
            onClick={() => handleMenuItemClick(country)}
          >
            {country}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Utforsk basert på land</FormHelperText>
    </FormControl>
  );
}

export default function Browse(): JSX.Element {
  const navigate = useNavigate();

  // State for the selected country
  const { isPending, isError, data, error } = useQuery<CountriesResponse>({
    queryKey: ["Countries"],
    queryFn: () => getCountries(),
    staleTime: Infinity,
  });

  const handleMenuItemClick = (country: string) => {
    navigate(`/results/${encodeURIComponent(country)}`);
  };

  if (isPending) {
    return createSelect({ countries: [], handleMenuItemClick });
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  const countries: string[] = data.getCountries;
  // Sort list alphabetically
  countries.sort((a, b) => a.localeCompare(b));

  if (!countries) {
    return createSelect({ countries: [], handleMenuItemClick });
  }

  return createSelect({ countries, handleMenuItemClick });
}
