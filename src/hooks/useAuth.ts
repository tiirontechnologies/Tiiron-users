import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface AuthUser {
  id: number;
  username: string;
  email: string;
  roleId?: "admin" | "user";
  orgCode?: string;
}

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  
  // Get Firebase auth state from Redux
  const firebaseAuth = useSelector((state: RootState) => state.firebaseAuth);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decodedUser: AuthUser = jwtDecode(storedToken);

        setToken(storedToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("token");
      }
    } else {
      setToken(null);
      setUser(null);
    }
  }, []);

  // Check if user is logged in via either method
  const isLoggedIn = !!token || firebaseAuth.isAuthenticated;

  return {
    token,
    user,
    isAdmin: user?.roleId === "admin" || firebaseAuth.backendUser?.roleId === "admin",
    isLoggedIn,
    firebaseUser: firebaseAuth.user,
    backendUser: firebaseAuth.backendUser,
  };
};
