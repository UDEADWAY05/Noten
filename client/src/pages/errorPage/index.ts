import { lazy } from "react";

const ErrorPage = lazy(
  () => import("./ErrorPage").then(module => ({ default: module.ErrorPage }))
);

export default ErrorPage;