import type { JSX } from "react";
import { getAllUsers } from "./get-all-users";

export const App = (): JSX.Element => {
  getAllUsers();
  return <>App</>;
};
