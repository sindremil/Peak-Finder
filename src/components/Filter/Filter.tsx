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
  toggleHasChairlift,
  toggleHasGondola,
  toggleHasNightSkiing,
  toggleHasPark,
  toggleIsCertified,
} from "./filterSlice";

function ParkChip(): JSX.Element {
  const dispatch = useAppDispatch();
  const hasPark = useAppSelector((state) => state.filter.hasPark);

  return (
    <CustomChip
      label="Park"
      selected={hasPark}
      onClick={() => {
        hasPark;
        dispatch(toggleHasPark());
      }}
    />
  );
}

function NightSkiingChip(): JSX.Element {
  const dispatch = useAppDispatch();
  const hasNightSkiing = useAppSelector((state) => state.filter.hasNightSkiing);

  return (
    <CustomChip
      label="Kveldskjøring"
      selected={hasNightSkiing}
      onClick={() => {
        hasNightSkiing;
        dispatch(toggleHasNightSkiing());
      }}
    />
  );
}

function ChairliftChip(): JSX.Element {
  const dispatch = useAppDispatch();
  const hasChairlift = useAppSelector((state) => state.filter.hasChairlift);

  return (
    <CustomChip
      label="Stolheis"
      selected={hasChairlift}
      onClick={() => {
        hasChairlift;
        dispatch(toggleHasChairlift());
      }}
    />
  );
}

function GondolaChip(): JSX.Element {
  const dispatch = useAppDispatch();
  const hasGondola = useAppSelector((state) => state.filter.hasGondola);

  return (
    <CustomChip
      label="Gondol"
      selected={hasGondola}
      onClick={() => {
        hasGondola;
        dispatch(toggleHasGondola());
      }}
    />
  );
}

function CertifiedChip(): JSX.Element {
  const dispatch = useAppDispatch();
  const isCertified = useAppSelector((state) => state.filter.isCertified);

  return (
    <CustomChip
      label="Peak Finder Sertifisert"
      selected={isCertified}
      onClick={() => {
        isCertified;
        dispatch(toggleIsCertified());
      }}
    />
  );
}

// Component for grouping all the chips
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
