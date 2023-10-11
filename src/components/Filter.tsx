import {
  Box,
  Chip,
  Container,
  Grid,
  Input,
  Slider,
  Stack,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HeightIcon from "@mui/icons-material/Height";
import RouteIcon from "@mui/icons-material/Route";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EuroIcon from "@mui/icons-material/Euro";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { OverridableComponent } from "@mui/material/OverridableComponent";

// This component
function SliderWithInput({
  label,
  Icon,
  defaultValue,
  minValue,
  maxValue,
  step,
}: {
  label: string;
  // This is the type of a MUI icon
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  defaultValue: number;
  minValue: number;
  maxValue: number;
  step: number;
}): JSX.Element {
  // Sets the current value of the SliderWithInput component.
  const [value, setValue] = React.useState(defaultValue);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < minValue) {
      setValue(minValue);
    } else if (value > maxValue) {
      setValue(maxValue);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        {label}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <Icon />
        </Grid>
        <Grid item xs={6}>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={minValue}
            max={maxValue}
            step={step}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            value={value === 0 ? "" : value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={String(defaultValue)}
            inputProps={{
              step,
              min: minValue,
              max: maxValue,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
            sx={{
              width: "65px"
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function Chips(): JSX.Element {
  const [nightSkiing, setNightSkiing] = useState(false);
  const [park, setPark] = useState(false);
  const [certified, setCertified] = useState(false);
  const handleClickNightSking = () => {
    setNightSkiing(!nightSkiing);
  };
  const handleClickPark = () => {
    setPark(!park);
  };
  const handleClickCertified = () => {
    setCertified(!certified);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexFlow: "wrap", 
        gap: 1       
      }}
    >
      <Chip
        label="Kveldskjøring"
        onClick={handleClickNightSking}
        color={nightSkiing ? "primary" : "default"}
      />
      <Chip
        label="Park"
        onClick={handleClickPark}
        color={park ? "primary" : "default"}
      />
      <Chip
        label="Peak Finder sertifisert"
        onClick={handleClickCertified}
        color={certified ? "primary" : "default"}
      />
      <Chip
        label="Stolheis"
        onClick={handleClickCertified}
        color={certified ? "primary" : "default"}
      />
      <Chip
        label="Gondol"
        onClick={handleClickCertified}
        color={certified ? "primary" : "default"}
      />
    </Box>
  );
}

export default function Filter(): JSX.Element {
  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <SliderWithInput
          label="Minimum fallhøyde"
          Icon={HeightIcon}
          defaultValue={0}
          minValue={0}
          maxValue={3000}
          step={10}
        />
        <SliderWithInput
          label="Minimum basehøyde"
          Icon={LocationCityIcon}
          defaultValue={0}
          minValue={0}
          maxValue={3000}
          step={10}
        />
        <SliderWithInput
          label="Minimum total løypelegende"
          Icon={RouteIcon}
          defaultValue={0}
          minValue={0}
          maxValue={600}
          step={10}
        />
        <SliderWithInput
          label="Minimum total heiser"
          Icon={ArrowOutwardIcon}
          defaultValue={0}
          minValue={0}
          maxValue={200}
          step={1}
        />
        <SliderWithInput
          label="Makspris dagspass"
          Icon={EuroIcon}
          defaultValue={200}
          minValue={0}
          maxValue={200}
          step={5}
        />
        <Chips />
      </Stack>
    </Container>
  );
}
