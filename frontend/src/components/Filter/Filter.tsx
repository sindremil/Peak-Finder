import { Box, Container, Stack } from "@mui/material";
import HeightIcon from "@mui/icons-material/Height";
import RouteIcon from "@mui/icons-material/Route";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EuroIcon from "@mui/icons-material/Euro";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CustomSlider from "./CustomSlider";
import CustomChip from "./CustomChip";
import {
  setMaxDayPassPrice,
  setMinBaseElevation,
  setMinElevationDifference,
  setMinTotalLifts,
  setMinTotalPiste,
  toggleHasChairlift,
  toggleHasGondola,
  toggleHasNightSkiing,
  toggleHasPark,
  toggleIsCertified,
} from "./filterSlice";

function ParkChip(): JSX.Element {
  return (
    <CustomChip
      label="Park"
      selector={(state) => state.filter.hasPark}
      action={toggleHasPark}
    />
  );
}

function NightSkiingChip(): JSX.Element {
  return (
    <CustomChip
      label="Kveldskjøring"
      selector={(state) => state.filter.hasNightSkiing}
      action={toggleHasNightSkiing}
    />
  );
}

function ChairliftChip(): JSX.Element {
  return (
    <CustomChip
      label="Stolheis"
      selector={(state) => state.filter.hasChairlift}
      action={toggleHasChairlift}
    />
  );
}

function GondolaChip(): JSX.Element {
  return (
    <CustomChip
      label="Gondol"
      selector={(state) => state.filter.hasGondola}
      action={toggleHasGondola}
    />
  );
}

function CertifiedChip(): JSX.Element {
  return (
    <CustomChip
      label="Peak Finder Sertifisert"
      selector={(state) => state.filter.isCertified}
      action={toggleIsCertified}
    />
  );
}

function Chips(): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexFlow: "wrap",
        gap: 1,
      }}
    >
      <ParkChip />
      <NightSkiingChip />
      <ChairliftChip />
      <GondolaChip />
      <CertifiedChip />
    </Box>
  );
}

function MinimumElevationDifferenceSlider(): JSX.Element {
  return (
    <CustomSlider
      label="Minimum fallhøyde"
      Icon={HeightIcon}
      defaultValue={0}
      minValue={0}
      maxValue={3000}
      step={10}
      action={setMinElevationDifference}
    />
  );
}

function MinimumBaseElevationSlider(): JSX.Element {
  return (
    <CustomSlider
      label="Minimum basehøyde"
      Icon={LocationCityIcon}
      defaultValue={0}
      minValue={0}
      maxValue={3000}
      step={10}
      action={setMinBaseElevation}
    />
  );
}

function MinimumTotalPisteSlider(): JSX.Element {
  return (
    <CustomSlider
      label="Minimum total løypelegende"
      Icon={RouteIcon}
      defaultValue={0}
      minValue={0}
      maxValue={600}
      step={10}
      action={setMinTotalPiste}
    />
  );
}

function MinimumTotalLiftsSlider(): JSX.Element {
  return (
    <CustomSlider
      label="Minimum total heiser"
      Icon={ArrowOutwardIcon}
      defaultValue={0}
      minValue={0}
      maxValue={200}
      step={1}
      action={setMinTotalLifts}
    />
  );
}

function MaximumDayPassPriceSlider(): JSX.Element {
  return (
    <CustomSlider
      label="Makspris dagspass"
      Icon={EuroIcon}
      defaultValue={200}
      minValue={0}
      maxValue={200}
      step={5}
      action={setMaxDayPassPrice}
    />
  );
}

// Component for grouping all the sliders
function Sliders(): JSX.Element {
  return (
    <Stack spacing={2}>
      <MinimumElevationDifferenceSlider />
      <MinimumBaseElevationSlider />
      <MinimumTotalPisteSlider />
      <MinimumTotalLiftsSlider />
      <MaximumDayPassPriceSlider />
    </Stack>
  );
}

export default function Filter(): JSX.Element {
  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={4}
      >
        <Sliders />
        <Chips />
      </Stack>
    </Container>
  );
}
