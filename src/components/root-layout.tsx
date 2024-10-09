import type { JSX } from "react";

import { PageContent } from "./page-content.tsx";
import { Box } from "@mui/material";
import { Header } from "./header.tsx";
import { Footer } from "./footer.tsx";

export const RootLayout = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <PageContent />
      <Footer />
    </Box>
  );
};
