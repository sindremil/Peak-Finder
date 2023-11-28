import { ThemeOptions } from "@mui/material";

const lightThemeConfig: ThemeOptions = {
  palette: {
    mode: "light",
  },
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

const darkThemeConfig: ThemeOptions = {
  palette: {
    mode: "dark",
  },
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

export { lightThemeConfig, darkThemeConfig };
