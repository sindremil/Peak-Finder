import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function Searchbar() {
  return(
    <TextField placeholder="Destinasjon, land..." sx={{
      marginTop: "2rem",
      width: "100%",
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start" sx={{
          color: "black"
        }}>
          <Search />
        </InputAdornment>
      )
    }} />
  )
}