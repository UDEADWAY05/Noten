import { lazy } from "react";

export const InfoPage = lazy(
  () => import("./infoPage").then(module => ({ default: module.InfoPage }))
);