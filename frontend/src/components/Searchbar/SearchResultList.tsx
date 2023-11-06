import { Alert, List, ListItemButton, Paper, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import getSearchResult from "../../api/getSearchResult";
import { SearchResult } from "./searchbarTypes";
import useDebounce from "../../hooks/useDebounce";
import {
  maxSearchQueryResults,
  searchQueryDebounceDelayMs,
} from "../../config";

function LoadingSearchResultListItems(): JSX.Element {
  // TODO make length dynamic from last search result
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
    queryFn: () => getSearchResult(debouncedSearchTerm, maxSearchQueryResults),
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

  if (!searchTerm || content() === null) {
    return null;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        maxHeight: "50vh",
        zIndex: 1,
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
      }}
    >
      {content()}
    </Paper>
  );
}
