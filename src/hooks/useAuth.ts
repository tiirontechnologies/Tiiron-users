import { useCheckAuthQuery } from "../api/api.routes";

interface AuthUser {
  id: number;
  username: string;
  email: string;
  roleId?: "admin" | "user";
  orgCode?: string;
}

export const useAuth = () => {
  // Call /profile/me API to check authentication status
  const { data, error, isLoading } = useCheckAuthQuery();

  // If API returns 200 (no error), user is logged in
  // If API returns error or non-200, user is not logged in
  const isLoggedIn = !isLoading && !error && !!data;
  
  return {
    token: null, // Token is no longer read from cookie
    user: null, // User data is no longer decoded from token
    isAdmin: false, // Admin status would need to come from API response if needed
    isLoggedIn,
  };
};
