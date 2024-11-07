import type { ReactNode } from "react";
import { Layout } from "react-admin";
import { CustomMenu } from "./menu";

export const CustomLayout = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => (
  <Layout sx={{ margin: 0, padding: 0 }} menu={CustomMenu}>
    {children}
  </Layout>
);
