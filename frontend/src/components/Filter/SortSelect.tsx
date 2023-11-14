import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  resetSort,
  toggleSortAZ,
  toggleSortBaseElevation,
  toggleSortDayPassPrice,
  toggleSortElevationDifference,
  toggleSortTotalLifts,
  toggleSortTotalPiste,
  toggleSortZA,
} from "./filterSlice";

export default function SortSelect(): JSX.Element {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  const sortActions = {
    AZ: toggleSortAZ,
    ZA: toggleSortZA,
    elevationDifference: toggleSortElevationDifference,
    baseElevation: toggleSortBaseElevation,
    totalPiste: toggleSortTotalPiste,
    totalLifts: toggleSortTotalLifts,
    maxDayPassPrice: toggleSortDayPassPrice,
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value as keyof typeof sortActions;

    // Dispatch the corresponding action based on the selected value
    const selectedAction = sortActions[newValue];
    if (selectedAction) {
      dispatch(resetSort());
      dispatch(selectedAction(true));
      setSelectedValue(selectedValue);
    }
  };

  return (
    <FormControl sx={{ minWidth: "200px" }}>
      <InputLabel id="sortSelectLabel">Sorter</InputLabel>
      <Select
        size="medium"
        labelId="sortSelectLabel"
        id="sortSelect"
        label="Sorter"
        value={selectedValue}
        onChange={handleChange}
      >
        <MenuItem value="AZ">A-Z</MenuItem>
        <MenuItem value="ZA">Z-A</MenuItem>
        <MenuItem value="elevationDifference">Største fallhøyde</MenuItem>
        <MenuItem value="baseElevation">Største basehøyde</MenuItem>
        <MenuItem value="totalPiste">Størst total løypelegende</MenuItem>
        <MenuItem value="totalLifts">Flest heiser</MenuItem>
        <MenuItem value="maxDayPassPrice">Billigst dagspass</MenuItem>
      </Select>
    </FormControl>
  );
}
