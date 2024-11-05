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
      <Stack alignItems="center" className=" flex-row justify-evenly">
        <Stack
          alignItems="center"
          flexDirection="row"
          sx={{ transition: "2s" }}
          width={{ lg: "30%", md: "60%", sm: "80%", xs: "95%" }}
        >
          <Navigation />
          <ChangeThemeButton />
        </Stack>
      </Stack>
    </AppBar>
  );
};
