import type { JSX, PropsWithChildren } from "react";

import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";

import { theme } from "@/config/theme";

export const ThemeProvider = ({ children }: PropsWithChildren): JSX.Element => {
  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};
