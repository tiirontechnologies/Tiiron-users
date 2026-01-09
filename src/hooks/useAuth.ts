import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthUser {
  id: number;
  username: string;
  email: string;
  roleId?: "admin" | "user";
  orgCode?: string;
}

// 🔹 Helper function to get the token from cookie 
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift()!;
  return null;
};

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // get token from cookie 
    const cookieToken = getCookie("token"); // cookie name

    if (cookieToken) {
      try {
        const decodedUser: AuthUser = jwtDecode(cookieToken);

        setToken(cookieToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      setToken(null);
      setUser(null);
    }
  }, []);

  // Check if user is logged in
  const isLoggedIn = !!token;

  return {
    token,
    user,
    isAdmin: user?.roleId === "admin",
    isLoggedIn,
  };
};
