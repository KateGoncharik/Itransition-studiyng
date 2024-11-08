import { useThemeContext } from "@/hooks/use-theme-context";
import { Button } from "@mui/material";
import { FC } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { headerButtonStyles } from "./header-button-styles";
export const ChangeThemeButton: FC = () => {
  const { toggleTheme, mode } = useThemeContext();

  return (
    <Button sx={headerButtonStyles} color="primary" onClick={toggleTheme}>
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </Button>
  );
};
