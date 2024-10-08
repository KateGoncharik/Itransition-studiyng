import { ReactNode } from "react";

export default function ErrorPage(): ReactNode {
  return (
    <>
      Sorry, an unexpected error has occurred. Try to reload the page. Or get
      back to main.
      <a href="/">Back to main</a>
    </>
  );
}
