import { Box, Grid, Input, Slider, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"; // Import the hook

// The onBlur event occurs when an input field loses focus

// The label of the CustomSlider
function Label({ label }: { label: string }): JSX.Element {
  return (
    <Typography id="input-slider" gutterBottom>
      {label}
    </Typography>
  );
}

// The icon for the CustomSlider
function SliderIcon({
  Icon,
}: {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}): JSX.Element {
  return (
    <Grid item xs={2}>
      <Icon />
    </Grid>
  );
}

// The slider for the CustomSlider
// Value state is lifted up to parent
function SliderSlider({
  value,
  minValue,
  maxValue,
  step,
  onChange,
}: {
  value: number;
  minValue: number;
  maxValue: number;
  step: number;
  onChange: (value: number) => void;
}): JSX.Element {
  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    onChange(newValue as number);
  };

  return (
    <Grid item xs={6}>
      <Slider
        value={typeof value === "number" ? value : 0}
        onChange={handleSliderChange}
        data-testid="slider"
        aria-labelledby="input-slider"
        min={minValue}
        max={maxValue}
        step={step}
      />
    </Grid>
  );
}

// The input field that is linked with the slider
// Value is lifted up to parent
function SliderInput({
  value,
  defaultValue,
  minValue,
  maxValue,
  step,
  onChange,
}: {
  value: number;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  step: number;
  onChange: (value: number) => void;
}): JSX.Element {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue =
      event.target.value === "" ? 0 : Number(event.target.value);
    onChange(inputValue);
  };

  return (
    <Grid item xs={4}>
      <Input
        value={value === 0 ? "" : value}
        size="small"
        data-testid="sliderInput"
        onChange={handleInputChange}
        placeholder={String(defaultValue)}
        inputProps={{
          step,
          min: minValue,
          max: maxValue,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
        sx={{
          width: "65px",
        }}
      />
    </Grid>
  );
}

// Parent component for the SliderSlider and SliderInput
// Receives the value from both children and tracks the state
function IconSliderInput({
  defaultValue,
  minValue,
  maxValue,
  step,
  Icon,
  onChange,
}: {
  defaultValue: number;
  minValue: number;
  maxValue: number;
  step: number;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  onChange: (value: number) => void;
}) {
  // Sets the current value of the CustomSlider component.
  const [value, setValue] = useState(defaultValue);

  const handleSliderChange = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  const handleInputChange = (newValue: number) => {
    if (newValue < minValue) {
      setValue(minValue);
      onChange(minValue);
    } else if (newValue > maxValue) {
      setValue(maxValue);
      onChange(maxValue);
    } else {
      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <SliderIcon Icon={Icon} />
      <SliderSlider
        value={value}
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        onChange={handleSliderChange}
      />
      <SliderInput
        defaultValue={defaultValue}
        value={value}
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        onChange={handleInputChange}
      />
    </Grid>
  );
}

// This component is a better alternative to the regular MUI slider
// CustomSlider takes in an action to update the state
export default function CustomSlider({
  label,
  Icon,
  defaultValue,
  minValue,
  maxValue,
  step,
  action,
}: {
  label: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  defaultValue: (state: any) => number;
  minValue: number;
  maxValue: number;
  step: number;
  action: (value: number) => { type: string };
}): JSX.Element {
  const dispatch = useAppDispatch();
  const value = useAppSelector(defaultValue);

  return (
    <Box sx={{ width: 250 }}>
      <Label label={label} />
      <IconSliderInput
        Icon={Icon}
        defaultValue={value}
        minValue={minValue}
        maxValue={maxValue}
        step={step}
        onChange={(newValue) => dispatch(action(newValue))}
      />
    </Box>
  );
}
