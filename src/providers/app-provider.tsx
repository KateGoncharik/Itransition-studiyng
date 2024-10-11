import type { JSX } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider";
import { router } from "@/router/router";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./auth-provider";

export const AppProvider = (): JSX.Element => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
};
