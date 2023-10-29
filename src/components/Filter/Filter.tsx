import { Box, Container, Stack } from "@mui/material";
import HeightIcon from "@mui/icons-material/Height";
import RouteIcon from "@mui/icons-material/Route";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EuroIcon from "@mui/icons-material/Euro";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CustomSlider from "./CustomSlider";
import { useAppDispatch, useAppSelector } from "../../hooks";
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
  const hasPark = useAppSelector((state) => state.filter.hasPark);

  return <CustomChip label="Park" selected={hasPark} action={toggleHasPark} />;
}

function NightSkiingChip(): JSX.Element {
  const hasNightSkiing = useAppSelector((state) => state.filter.hasNightSkiing);

  return (
    <CustomChip
      label="Kveldskjøring"
      selected={hasNightSkiing}
      action={toggleHasNightSkiing}
    />
  );
}

// For ChairliftChip
function ChairliftChip(): JSX.Element {
  const hasChairlift = useAppSelector((state) => state.filter.hasChairlift);

  return (
    <CustomChip
      label="Stolheis"
      selected={hasChairlift}
      action={toggleHasChairlift}
    />
  );
}

function GondolaChip(): JSX.Element {
  const hasGondola = useAppSelector((state) => state.filter.hasGondola);

  return (
    <CustomChip
      label="Gondol"
      selected={hasGondola}
      action={toggleHasGondola}
    />
  );
}

function CertifiedChip(): JSX.Element {
  const isCertified = useAppSelector((state) => state.filter.isCertified);

  return (
    <CustomChip
      label="Peak Finder Sertifisert"
      selected={isCertified}
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
  const dispatch = useAppDispatch();
  return (
    <CustomSlider
      label="Minimum fallhøyde"
      Icon={HeightIcon}
      defaultValue={0}
      minValue={0}
      maxValue={3000}
      step={10}
      onChange={(value) => dispatch(setMinElevationDifference(value))}
    />
  );
}

// Component for grouping all the sliders
function Sliders(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Stack spacing={2}>
      <MinimumElevationDifferenceSlider />
      <CustomSlider
        label="Minimum basehøyde"
        Icon={LocationCityIcon}
        defaultValue={0}
        minValue={0}
        maxValue={3000}
        step={10}
        onChange={(value) => dispatch(setMinBaseElevation(value))}
      />
      <CustomSlider
        label="Minimum total løypelegende"
        Icon={RouteIcon}
        defaultValue={0}
        minValue={0}
        maxValue={600}
        step={10}
        onChange={(value) => dispatch(setMinTotalPiste(value))}
      />
      <CustomSlider
        label="Minimum total heiser"
        Icon={ArrowOutwardIcon}
        defaultValue={0}
        minValue={0}
        maxValue={200}
        step={1}
        onChange={(value) => dispatch(setMinTotalLifts(value))}
      />
      <CustomSlider
        label="Makspris dagspass"
        Icon={EuroIcon}
        defaultValue={200}
        minValue={0}
        maxValue={200}
        step={5}
        onChange={(value) => dispatch(setMaxDayPassPrice(value))}
      />
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
