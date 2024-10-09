import { FC, ReactNode } from "react";

import { Stack } from "@mui/system";

export const Footer: FC<{
  children?: ReactNode;
}> = () => {
  return (
    <Stack
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        marginTop: "auto",
        minHeight: "5vh",
        padding: 1,
      }}
    >
      <Stack
        sx={{
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 3,
          justifyContent: "space-between",
          width: "90%",
        }}
      ></Stack>
    </Stack>
  );
};
