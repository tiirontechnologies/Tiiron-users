import { Navigate } from "react-router-dom";
import type { Route } from "types/routes";
import Login from "@pages/auth/login";
import Signup from "@pages/auth/signup";
import OrgSignup from "@pages/auth/organization-signup";
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
    element: <OrgSignup />,
  },
];
