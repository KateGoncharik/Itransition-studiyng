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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
            width: "8px",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundColor: "#6b6b6b",
            border: "1px solid #2b2b2b",
            borderRadius: 8,
            minHeight: 24,
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#959595",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
          scrollbarColor: "#6b6b6b #2b2b2b",
          scrollbarWidth: "thin",
        },
      },
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
