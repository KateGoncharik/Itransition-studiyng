import {
  createContext,
  type FC,
  type ReactNode,
  useMemo,
  useState,
} from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  Theme,
} from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export interface ThemeContextType {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const AppThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const storedTheme = localStorage.getItem("theme");
  const initialMode: "light" | "dark" =
    storedTheme === "light" || storedTheme === "dark" ? storedTheme : "dark";

  const [mode, setMode] = useState<"light" | "dark">(initialMode);

  const toggleTheme = (): void => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            dark: "#3660ab",
            main: "#2da2ff",
            light: "#66a8f8",
            contrastText: mode === "dark" ? "#fff" : "#000",
          },
          secondary: {
            main: "#19857b",
          },
          background: {
            default: mode === "dark" ? "#21253c" : "#ffffff",
            paper: mode === "dark" ? "#0d3557" : "#f5f5f5",
          },
          text: {
            primary: mode === "dark" ? "#fff" : "#000",
            secondary: mode === "dark" ? "#ccc" : "#333",
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 320,
            md: 600,
            lg: 800,
            xl: 1200,
          },
        },
      }),
    [mode],
  );
  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
