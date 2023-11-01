import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import DestinationCard from "./DestinationCard"; // Import your DestinationCard component

import {
  hemsedal,
  saalbach,
  zermatt,
  chamonix,
  verbier,
  davos,
  courchevel,
  innsbruck,
  stMoritz,
} from "../mockData/destinations";

export default function Browse(): JSX.Element {
  // State for the selected country
  const [selectedCountry, setSelectedCountry] = useState("Norway");

  // Mock destinations
  const destinations = [
    hemsedal,
    saalbach,
    zermatt,
    chamonix,
    verbier,
    davos,
    courchevel,
    innsbruck,
    stMoritz,
  ];

  // Handle change of country
  const handleCountryChange = (_event: any, newCountry: string | null) => {
    setSelectedCountry(newCountry || "");
  };

  // Create a list of destinations filtered by the selected country
  // If no country is selected, return an empty list
  const filteredDestinations = selectedCountry
    ? destinations.filter(
        (destination) => destination.country === selectedCountry,
      )
    : [];

  return (
    <>
      <Typography variant="h4" component="h2" sx={{ marginTop: "10rem" }}>
        Utforsk
      </Typography>
      <Autocomplete
        id="country-select"
        options={["Norway", "Switzerland", "France", "Austria"]}
        value={selectedCountry}
        onChange={handleCountryChange}
        sx={{ width: 300, marginTop: "1.5rem" }}
        // Disabling the eslint rule below since renderInput passes way to many props to write out manually
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Velg et land" />}
      />
      <Grid container spacing={4} sx={{ marginTop: "0.2vw" }}>
        {filteredDestinations.map((destination) => (
          <Grid item key={destination.name} xs={12} sm={6} md={4}>
            <DestinationCard destinationCardProps={destination} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
