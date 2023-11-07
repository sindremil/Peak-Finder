import { Select, FormControl, FormHelperText, InputLabel } from "@mui/material";
import BrowseList from "./BrowseList";

export default function Browse(): JSX.Element {
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="browseSelectLabel">Land</InputLabel>
      <Select
        labelId="browseSelectLabel"
        id="browseSelect"
        label="Land"
        value=""
      >
        {BrowseList()}
      </Select>
      <FormHelperText>Utforsk basert på land</FormHelperText>
    </FormControl>
  );
}
