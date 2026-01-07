import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

// Helper function to get cookie value
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift()!;
  return null;
};

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; // optional
}

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps) {
  const location = useLocation();

  // Check for token in cookie instead of localStorage
  const token = getCookie("token");
  const role = localStorage.getItem("roleId");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ❌ Role not allowed
  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized
  return <>{children}</>;
}
