import { Navigate } from "react-router-dom";
import type { Route } from "types/routes";
import { Login, Signup, OrganizationSignup } from "../features";
export const authRoutes: Route[] = [
  {
    path: "/",
    element: <Navigate to="/login" replace={true} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/organization/create-account",
    element: <OrganizationSignup />,
  },
];
