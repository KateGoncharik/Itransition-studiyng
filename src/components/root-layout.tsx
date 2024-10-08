import type { JSX } from "react";

import { PageContent } from "./page-content.tsx";

export const RootLayout = (): JSX.Element => {
  return (
    <>
      <PageContent />
    </>
  );
};
