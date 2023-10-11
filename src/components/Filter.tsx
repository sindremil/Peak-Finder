import { Box, Chip, Container, Stack } from "@mui/material";
import { useState } from "react";
import HeightIcon from "@mui/icons-material/Height";
import RouteIcon from "@mui/icons-material/Route";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EuroIcon from "@mui/icons-material/Euro";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CustomSlider from "./CustomSlider";

// Reusable Chip component
function ChipOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}): JSX.Element {
  return (
    <Chip
      label={label}
      onClick={onClick}
      color={selected ? "primary" : "default"}
    />
  );
}

// Component for grouping all the chips
function Chips(): JSX.Element {
  const [nightSkiing, setNightSkiing] = useState(false);
  const [park, setPark] = useState(false);
  const [certified, setCertified] = useState(false);
  const [chairLift, setChairLift] = useState(false);
  const [gondolas, setGondolas] = useState(false);

  const toggleOption = (setter: Function) => () => {
    setter((prev: boolean) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexFlow: "wrap",
        gap: 1,
      }}
    >
      <ChipOption
        label="Kveldskjøring"
        selected={nightSkiing}
        onClick={toggleOption(setNightSkiing)}
      />
      <ChipOption
        label="Park"
        selected={park}
        onClick={toggleOption(setPark)}
      />
      <ChipOption
        label="Peak Finder sertifisert"
        selected={certified}
        onClick={toggleOption(setCertified)}
      />
      <ChipOption
        label="Stolheis"
        selected={chairLift}
        onClick={toggleOption(setChairLift)}
      />
      <ChipOption
        label="Gondol"
        selected={gondolas}
        onClick={toggleOption(setGondolas)}
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
        <CustomSlider
          label="Minimum fallhøyde"
          Icon={HeightIcon}
          defaultValue={0}
          minValue={0}
          maxValue={3000}
          step={10}
        />
        <CustomSlider
          label="Minimum basehøyde"
          Icon={LocationCityIcon}
          defaultValue={0}
          minValue={0}
          maxValue={3000}
          step={10}
        />
        <CustomSlider
          label="Minimum total løypelegende"
          Icon={RouteIcon}
          defaultValue={0}
          minValue={0}
          maxValue={600}
          step={10}
        />
        <CustomSlider
          label="Minimum total heiser"
          Icon={ArrowOutwardIcon}
          defaultValue={0}
          minValue={0}
          maxValue={200}
          step={1}
        />
        <CustomSlider
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
