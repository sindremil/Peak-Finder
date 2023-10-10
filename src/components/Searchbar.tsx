import { Box, TextField, Button } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function Searchbar() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
        width: "100%",
      }}
    >
      <TextField
        placeholder="Destinasjon, land..."
        sx={{
          flex: 1,
          borderColor: "#2074d4",
        }}
      />
      <Button variant="contained">
        <Search />
      </Button>
    </Box>
  );
}
