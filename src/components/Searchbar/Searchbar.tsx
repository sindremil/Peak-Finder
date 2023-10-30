import React, { useState } from "react";
import { Box, TextField, useMediaQuery, List, Paper, ListItemButton, Skeleton } from "@mui/material";
import { setSearchValue } from "./searchSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useQuery } from "@tanstack/react-query";
import fetchSearchResults from "./fetchSearchResults";

function SearchResults(): JSX.Element | null {
  const searchValue = useAppSelector(state => state.search.searchValue);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["searchValue", searchValue],
    queryFn: () => fetchSearchResults(searchValue),
    enabled: !!searchValue,
    staleTime: Infinity,
  });

  if (!searchValue) {
    return null;
  }
  if (isPending) {
    return (
      <Paper elevation={3} sx={{ maxHeight: "50vh", overflow: 'auto' }}>
        <List>
          <ListItemButton>
            <Skeleton variant="text" width={250} />
          </ListItemButton>
          <ListItemButton>
            <Skeleton variant="text" width={250} />
          </ListItemButton>
          <ListItemButton>
            <Skeleton variant="text" width={250} />
          </ListItemButton>
          <ListItemButton>
            <Skeleton variant="text" width={250} />
          </ListItemButton>
          <ListItemButton>
            <Skeleton variant="text" width={250} />
          </ListItemButton>
        </List>
      </Paper>
    )
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        maxHeight: "50vh",
        display: data.data.resorts.length === 0 ? "none" : "block" 
      }}
    >
    <List>
      {data.data.resorts.map((resort, index) => (
        <ListItemButton key={index}>
          {resort.name}
        </ListItemButton>
      ))}
    </List>
  </Paper>
  )
}

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
      <SearchResults />
    </Box>
  );
}
