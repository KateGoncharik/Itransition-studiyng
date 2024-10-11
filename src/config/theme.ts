import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const theme = createTheme({
  breakpoints: {
    values: {
      lg: 800,
      md: 600,
      sm: 320,
      xl: 1200,
      xs: 0,
    },
  },

  palette: {
    background: {
      default: "#21253c",
      paper: "#0d3557",
    },
    error: {
      main: red.A400,
    },
    mode: "dark",
    primary: {
      dark: "#3660ab",
      light: "#ccc",
      main: "#2da2ff",
    },
    secondary: {
      main: "#19857b",
    },
    text: {
      primary: "#fff",
      secondary: "#ccc",
    },
  },
});
