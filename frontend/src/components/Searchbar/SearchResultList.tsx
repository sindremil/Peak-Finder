import { Alert, List, ListItemButton, Paper, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import getSearchResult from "./getSearchResult";
import { SearchResult } from "./searchbarTypes";
import useDebounce from "../../hooks/useDebounce";
import {
  maxSearchQueryResults,
  searchQueryDebounceDelayMs,
} from "../../config";

// A placeholder component which is displayed when data being fetched
function LoadingSearchResultListItems(): JSX.Element {
  return (
    <List>
      {Array.from({ length: maxSearchQueryResults }).map((_, number) => (
        <ListItemButton key={number.toString()}>
          <Skeleton variant="text" width={250} />
        </ListItemButton>
      ))}
    </List>
  );
}

// The actual results of the search after the data was fetched successfully
function SearchResultListItems(props: {
  resorts: { Resort: string }[];
}): JSX.Element {
  const { resorts } = props;

  return (
    <List>
      {resorts.map(({ Resort }) => (
        <ListItemButton
          key={encodeURI(Resort)}
          component={Link}
          to={`/${encodeURI(Resort)}`}
        >
          {Resort}
        </ListItemButton>
      ))}
    </List>
  );
}

// The container for the SearchResultListItems
export default function SearchResultList(): JSX.Element | null {
  // The current search term
  const searchTerm = useAppSelector((state) => state.search.searchTerm);

  // A deboucned search term which only updates after half a second on no
  // changes to the search term. Avoids unncessary API calls.
  const debouncedSearchTerm = useDebounce<string>(
    searchTerm,
    searchQueryDebounceDelayMs,
  );

  const { isPending, isError, data, error } = useQuery<SearchResult>({
    queryKey: ["searchTerm", debouncedSearchTerm, maxSearchQueryResults],
    queryFn: () =>
      getSearchResult(debouncedSearchTerm, maxSearchQueryResults),
    enabled: !!debouncedSearchTerm,
    staleTime: Infinity,
  });

  function content(): JSX.Element | null {
    if (isPending) {
      return <LoadingSearchResultListItems />;
    }

    if (isError) {
      return <Alert severity="error">{error.message}</Alert>;
    }

    const resorts: SearchResult["getDestinations"] = data.getDestinations;

    if (resorts.length === 0) {
      return null;
    }

    return <SearchResultListItems resorts={resorts} />;
  }

  if (!searchTerm) {
    return null;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        maxHeight: "50vh",
      }}
    >
      {content()}
    </Paper>
  );
}
