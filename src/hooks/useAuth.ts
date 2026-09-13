import { useCheckAuthQuery } from "../api/api.routes";

interface AuthUser {
  id: number;
  username: string;
  email: string;
  roleId?: "admin" | "user";
  orgCode?: string;
  picture?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

export const useAuth = () => {
  const { data, error, isLoading } = useCheckAuthQuery();
  const isLoggedIn = !isLoading && !error && !!data;

  return {
    token: null,
    user: data?.data ? {
      id: 0,
      username: data.data.username || "",
      email: data.data.email || "",
      picture: data.data.picture || null,
      firstName: data.data.firstName || null,
      lastName: data.data.lastName || null,
    } : null,
    isAdmin: false,
    isLoggedIn,
    isLoading,
  };
};
