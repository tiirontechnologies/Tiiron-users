import { useCheckAuthQuery } from "../api/api.routes";

interface AuthUser {
  id: number;
  username: string;
  email: string;
  roleId?: "admin" | "user";
  orgCode?: string;
}

export const useAuth = () => {
  const { data, error, isLoading } = useCheckAuthQuery();
  const isLoggedIn = !isLoading && !error && !!data;

  return {
    token: null,
    user: null,
    isAdmin: false,
    isLoggedIn,
    isLoading, 
  };
};
