import { lazy } from "react";

export const Main = lazy(() => import("../pages/main-page"));
export const NotFound = lazy(() => import("../pages/not-found-page"));
export const Registration = lazy(() => import("../pages/registration-page"));
export const Login = lazy(() => import("../pages/login-page"));
export const Constructor = lazy(() => import("../pages/constructor-page"));
