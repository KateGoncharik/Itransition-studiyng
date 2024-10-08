import { ReactNode } from "react";

export default function NotFoundPage(): ReactNode {
  return (
    <>
      Oh, hi! Sorry, but here is nothing to do.
      {`404 - Page ${window.location.pathname} was not found`}
      <a href="/">Back to main</a>
    </>
  );
}
