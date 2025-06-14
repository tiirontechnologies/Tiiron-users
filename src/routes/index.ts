import MainLayout from "@layouts/MainLayout";
import { appRoutes } from "./appRoutess";
import { globalRoutes } from "./globalRoutes";
import React from "react";
export const routeConfig = [
  {
    element: React.createElement(MainLayout),
    children: [...appRoutes, ...globalRoutes],
  },
  {
    // auth route come here
  },
];
