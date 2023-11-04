import { useCallback, useMemo } from "react";
import {
  Alert,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import getSearchResult from "./getSearchResult";
import { SearchResult } from "./searchbarTypes";
import useDebounce from "../../hooks/useDebounce";
import {
  maxSearchQueryResults,
  searchQueryDebounceDelayMs,
} from "../../config";
import { setSearchTerm } from "./searchSlice";

// A placeholder component which is displayed when data being fetched
function LoadingSearchResultListItems(): JSX.Element {
  return (
    <List>
      {Array.from({ length: maxSearchQueryResults }).map((_, number) => (
        <ListItem key={number.toString()} disableGutters disablePadding>
          <ListItemButton>
            <Skeleton variant="text" width={250} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

// The actual results of the search after the data was fetched successfully
function SearchResultListItems(props: {
  resorts: { Resort: string }[];
}): JSX.Element {
  const { resorts } = props;
  const dispatch = useAppDispatch();

  // Clears the redux search term
  const handleClick = useCallback(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  return (
    <List>
      {resorts.map(({ Resort }) => (
        <ListItem
          onClick={handleClick}
          disableGutters
          key={encodeURI(Resort)}
          disablePadding
        >
          <ListItemButton component={Link} to={`/${encodeURI(Resort)}`}>
            <ListItemText>{Resort}</ListItemText>
          </ListItemButton>
        </ListItem>
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
    queryFn: () => getSearchResult(debouncedSearchTerm, maxSearchQueryResults),
    enabled: !!debouncedSearchTerm,
    staleTime: Infinity,
  });

  const content = useMemo(() => {
    if (isPending) {
      return <LoadingSearchResultListItems />;
    }

    if (isError) {
      return <Alert severity="error">{error.message}</Alert>;
    }

    if (data.getDestinations.length === 0) {
      return null;
    }

    return <SearchResultListItems resorts={data.getDestinations} />;
  }, [isPending, isError, data, error]);

  if (!searchTerm) {
    return null;
  }

  return <Paper elevation={3}>{content}</Paper>;
}
