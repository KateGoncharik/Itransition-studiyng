import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

const PageContent = (): ReactNode => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export { PageContent };
