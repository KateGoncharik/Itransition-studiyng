import type { JSX } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider";
import { router } from "@/router/router";
import { CssBaseline } from "@mui/material";

export const AppProvider = (): JSX.Element => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
