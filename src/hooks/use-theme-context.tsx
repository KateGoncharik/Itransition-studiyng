import { ThemeContext, ThemeContextType } from "@/providers/app-theme-provider";
import { useContext } from "react";

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext has to be used inside ThemeContextProvider",
    );
  }
  return context;
};
