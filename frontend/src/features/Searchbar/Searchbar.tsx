import { Box, TextField, useMediaQuery } from "@mui/material";
import React, { RefObject, useState } from "react";
import { useAppDispatch } from "../../hooks";
import SearchResultList from "./SearchResultList";
import { setSearchTerm } from "./searchSlice";

export default function Searchbar({
  inputRef,
}: {
  inputRef: RefObject<HTMLInputElement>;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const [localSearchValue, setLocalSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue !== null) {
      setLocalSearchValue(newValue);
      dispatch(setSearchTerm(newValue));
    }
  };
  // Media query for mobile that increases size of search bar
  const isMobile = useMediaQuery("(max-aspect-ratio: 3/4)");

  return (
    <Box
      role="search"
      aria-label="Søkefelt"
      component="div"
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "2.5rem",
        width: isMobile ? "80%" : "65%",
      }}
    >
      <TextField
        placeholder="Søk etter destinasjon"
        value={localSearchValue}
        onChange={handleInputChange}
        inputRef={inputRef}
        sx={{
          flex: 1,
          borderColor: "#2074d4",
        }}
        autoComplete="off"
      />
      <SearchResultList />
    </Box>
  );
}
