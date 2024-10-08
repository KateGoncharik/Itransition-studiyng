import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { RootLayout } from "../components/root-layout.tsx";
import ErrorPage from "../pages/error-page.tsx";

import { Main, NotFound } from "./lazy-loading.tsx";

export const routes = [
  {
    children: [
      {
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Main />
          </Suspense>
        ),
        index: true,
      },

      {
        element: (
          <Suspense fallback={<>Loading...</>}>
            <NotFound />
          </Suspense>
        ),
        path: "*",
      },
    ],
    element: (
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <RootLayout />
      </ErrorBoundary>
    ),
    path: "/",
  },
];
