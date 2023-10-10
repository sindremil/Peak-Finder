import { Box, TextField, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  // Hook used for search bar navigation
  // State for query will be added when functionality is implemented in future deliverables
  const navigate = useNavigate();

  // Navigate to results page when either button is pushed, or 'enter' is pressed
  const handleSearch = () => {
    navigate("/results");
  };

  // Call handleSearch when 'enter' is pressed
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

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
        onKeyDown={handleKeyPress}
        sx={{
          flex: 1,
          borderColor: "#2074d4",
        }}
      />
      <Button variant="contained" onClick={handleSearch}>
        <Search />
      </Button>
    </Box>
  );
}
