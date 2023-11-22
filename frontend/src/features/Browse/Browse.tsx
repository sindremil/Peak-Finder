import {
  FormControl,
  FormHelperText,
  InputLabel,
  List,
  Select,
} from "@mui/material";
import { useSelector } from "react-redux";
import BrowseList from "./BrowseList";

export default function Browse(): JSX.Element {
  const sok = useSelector((state: any) => state.search.searchTerm);
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      {sok === "" && (
        <InputLabel id="browseSelectLabel" sx={{}}>
          Land
        </InputLabel>
      )}

      <Select
        labelId="browseSelectLabel"
        id="browseSelect"
        label="Land"
        value=""
      >
        <List>{BrowseList()}</List>
      </Select>
      <FormHelperText>Utforsk basert på land</FormHelperText>
    </FormControl>
  );
}
