import { Alert, List, ListItemButton, Paper, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ResortName } from "./searchbarTypes";
import { useAppSelector } from "../../hooks";
import fetchSearchResults from "./fetchSearchResults";

function LoadingSearchResultListItems(): JSX.Element {
  return (
    <List>
      {Array.from({ length: 5 }).map(() => (
        <ListItemButton>
          <Skeleton variant="text" width={250} />
        </ListItemButton>
      ))}
    </List>
  );
}

function SearchResultListItems(props: { result: ResortName[] }): JSX.Element {
  const { result } = props;

  return (
    <List>
      {result.map((resorts) => (
        <ListItemButton>{resorts.name}</ListItemButton>
      ))}
    </List>
  );
}

export default function SearchResultList(): JSX.Element | null {
  const searchValue = useAppSelector((state) => state.search.searchValue);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["searchValue", searchValue],
    queryFn: () => fetchSearchResults(searchValue),
    enabled: !!searchValue,
    staleTime: Infinity,
  });

  function content(): JSX.Element | null {
    if (isPending) {
      return <LoadingSearchResultListItems />;
    }

    if (isError) {
      return <Alert severity="error">{error.message}</Alert>;
    }

    const result: ResortName[] = data.data.resorts;

    if (result.length === 0) {
      return null;
    }

    return <SearchResultListItems result={result} />;
  }

  if (!searchValue || content === null) {
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
