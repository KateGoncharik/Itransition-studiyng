import type { JSX } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router/router";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./auth-provider";
import { AppThemeProvider } from "./app-theme-provider";

export const AppProvider = (): JSX.Element => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AppThemeProvider>
    </AuthProvider>
  );
};
