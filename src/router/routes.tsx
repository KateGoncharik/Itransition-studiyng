import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { RootLayout } from "../components/root-layout.tsx";
import ErrorPage from "../pages/error-page.tsx";

import {
  Main,
  NotFound,
  Registration,
  Constructor,
  Login,
  Profile,
} from "./lazy-loading.tsx";
import { CircularProgress } from "@mui/material";
import { TemplateProvider } from "@/pages/template-provider.tsx";

import { FormComponent } from "@/pages/form-page.tsx";
import AdminComponent from "@/components/admin/admin.tsx";

export const routes = [
  {
    children: [
      {
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Main />
          </Suspense>
        ),
        index: true,
      },

      {
        element: (
          <Suspense fallback={<CircularProgress />}>
            <NotFound />
          </Suspense>
        ),
        path: "*",
      },
      {
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Registration />
          </Suspense>
        ),
        path: "/registration",
      },
      {
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Login />
          </Suspense>
        ),
        path: "/login",
      },
      {
        element: (
          <Suspense fallback={<CircularProgress />}>
            <TemplateProvider>
              <Constructor />
            </TemplateProvider>
          </Suspense>
        ),
        path: "/constructor",
      },
      {
        element: (
          <Suspense fallback={<CircularProgress />}>
            <FormComponent route="form" />
          </Suspense>
        ),
        path: "/forms/:id",
      },
      {
        element: (
          <Suspense fallback={<CircularProgress />}>
            <FormComponent route="template" />
          </Suspense>
        ),
        path: "/templates/:id",
      },
      {
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Profile />
          </Suspense>
        ),
        path: "/profile",
      },
    ],
    element: (
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <RootLayout />
      </ErrorBoundary>
    ),

    path: "/",
  },
  {
    element: (
      <Suspense fallback={<CircularProgress />}>
        <AdminComponent />
      </Suspense>
    ),
    path: "/admin/*",
  },
];
