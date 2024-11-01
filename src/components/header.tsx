import { FC, ReactNode } from "react";

import { AppBar, useScrollTrigger } from "@mui/material";
import { Stack } from "@mui/system";
import { Navigation } from "./navigation";
import { ChangeThemeButton } from "./change-theme-button";

export const Header: FC<{
  children?: ReactNode;
}> = () => {
  return (
    <AppBar
      className="px-5 py-1"
      sx={{
        bgcolor: useScrollTrigger() ? "primary.light" : "primary.main",
        position: "sticky",
        top: 0,
      }}
    >
      <Stack alignItems="center" className="w-full flex-row justify-between">
        <Stack
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ transition: "2s" }}
          width={{ lg: "20%", md: "30%", sm: "40%", xs: "50%" }}
        >
          <Navigation />
          <ChangeThemeButton />
        </Stack>
      </Stack>
    </AppBar>
  );
};
