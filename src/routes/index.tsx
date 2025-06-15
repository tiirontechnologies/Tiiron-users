import MainLayout from "@layouts/MainLayout";
import { appRoutes } from "./appRoutess";
import { globalRoutes } from "./globalRoutes";
import { authRoutes } from "./authRoutes";
export const routeConfig = [
  {
    element: <MainLayout />,
    children: [...appRoutes, ...globalRoutes],
  },

  ...authRoutes,
];
console.log(routeConfig, "routeConfig");
