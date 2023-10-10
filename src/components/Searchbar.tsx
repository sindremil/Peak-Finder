import { Box, TextField, Button, useMediaQuery } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Searchbar(): JSX.Element {
  // Hook used for search bar navigation
  // State for query will be added when functionality is implemented in future deliverables
  const navigate = useNavigate();

  // Navigate to results page when either button is pushed, or 'enter' is pressed
  const handleSearch = () => {
    navigate("/results");
  };

  // Media query for mobile that increases size of search bar
  const isMobile = useMediaQuery("(max-aspect-ratio: 3/4)");

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
        marginTop: "2.5rem",
        width: isMobile ? "80%" : "65%",
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
