import { lazy } from "react";

export const LoginPage = lazy(
  () => import("./loginPage").then(module => ({ default: module.LoginPage }))
);