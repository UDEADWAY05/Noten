import { lazy } from "react";

export const NotFoundPage = lazy(() =>
  import("./notFoundPage").then(module => ({ default: module.NotFoundPage }))
);