import React, { useState } from "react";
import { Box, TextField, useMediaQuery } from "@mui/material";
import { setSearchValue } from "./searchSlice";
import { useAppDispatch } from "../../hooks";
import SearchResultList from "./SearchResultList";

export default function Searchbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const [localSearchValue, setLocalSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setLocalSearchValue(newValue);
    dispatch(setSearchValue(newValue));
  };

  // Media query for mobile that increases size of search bar
  const isMobile = useMediaQuery("(max-aspect-ratio: 3/4)");

  return (
    <Box
      role="search"
      aria-label="Søkefelt"
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "2.5rem",
        width: isMobile ? "80%" : "65%",
      }}
    >
      <TextField
        placeholder="Destinasjon"
        value={localSearchValue}
        onChange={handleInputChange}
        sx={{
          flex: 1,
          borderColor: "#2074d4",
        }}
      />
      <SearchResultList />
    </Box>
  );
}
