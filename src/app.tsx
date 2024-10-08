import type { ReactNode } from "react";
import { AppProvider } from "./providers/app-provider";

export function App(): ReactNode {
  return <AppProvider />;
}
