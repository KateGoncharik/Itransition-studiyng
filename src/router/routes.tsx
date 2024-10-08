import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { RootLayout } from "../components/root-layout.tsx";
import ErrorPage from "../pages/error-page.tsx";

import { Main, NotFound, Registration, Login } from "./lazy-loading.tsx";

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
      {
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Registration />
          </Suspense>
        ),
        path: "/registration",
      },
      {
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Login />
          </Suspense>
        ),
        path: "/login",
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
