import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSortType } from "./filterSlice";
import { useAppSelector } from "../../hooks/hooks";

export default function SortSelect(): JSX.Element {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("AZ");
  const sortType = useAppSelector((state) => state.filter.sortType);

  if (selectedValue !== sortType) {
    setSelectedValue(sortType);
  }

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    dispatch(setSortType(newValue));
    setSelectedValue(newValue);
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
        <MenuItem value="AZ">A-Z (Standard)</MenuItem>
        <MenuItem value="ZA">Z-A</MenuItem>
        <MenuItem value="elevationDifference">Største fallhøyde</MenuItem>
        <MenuItem value="baseElevation">Største basehøyde</MenuItem>
        <MenuItem value="totalPiste">Største totale løypelegende</MenuItem>
        <MenuItem value="totalLifts">Flest heiser</MenuItem>
        <MenuItem value="dayPassPrice">Billigst dagspass</MenuItem>
      </Select>
    </FormControl>
  );
}
