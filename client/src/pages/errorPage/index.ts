import { lazy } from "react";

const ErrorPage = lazy(
  () => import("./errorPage").then(module => ({ default: module.ErrorPage }))
);

export default ErrorPage;