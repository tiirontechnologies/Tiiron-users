import { Navigate } from "react-router-dom";
import type { Route } from "types/routes";
import Login from "@pages/auth/login";
export const authRoutes: Route[] = [
  {
    path: "/",
    element: <Navigate to="/login" replace={true} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
