import { ThemeOptions } from "@mui/material";

// Common configuration
const baseThemeConfig: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 720,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

// Light theme configuration
const lightThemeConfig: ThemeOptions = {
  ...baseThemeConfig,
  palette: {
    mode: "light",
  },
};

// Dark theme configuration
const darkThemeConfig: ThemeOptions = {
  ...baseThemeConfig,
  palette: {
    mode: "dark",
  },
};

export { lightThemeConfig, darkThemeConfig };
