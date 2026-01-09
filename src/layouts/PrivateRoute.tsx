import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; // optional
}

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps) {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const role = localStorage.getItem("roleId");

  // ❌ Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ❌ Role not allowed
  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized
  return <>{children}</>;
}
