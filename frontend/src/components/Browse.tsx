import { Autocomplete, TextField, Typography } from "@mui/material";

export default function Browse(): JSX.Element {
  return (
    <>
      <Typography variant="h4" component="h2" sx={{
          marginTop: "10rem",
        }}>
          Utforsk
        </Typography>
        <Autocomplete
          id="country-select"
          options={["Norway", "Sweden", "Finland", "Denmark"]}
          sx={{ 
            width: 300,
            marginTop: "1.5rem", 
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Velg et land"
            />
          )}
        />
    </>
  );
}