import { clearAuthData, getAuthData, saveAuthData } from "@/auth/auth-storage";
import { useAuthStore } from "@/auth/auth-store";
import { useEffect } from "react";

export const useAuth = () => {
  const { user, token, isAuthenticated, setUser, logout } = useAuthStore();

  useEffect(() => {
    const loadAuthData = async () => {
      const { token, user } = await getAuthData();
      if (token && user) {
        setUser(user, token);
      }
    };
    loadAuthData();
  }, [setUser]);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (isAuthenticated) {
      console.error("User already authenticated");
    }

    try {
      const { token, user } = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      ).then((res) => res.json());

      setUser(user, token);
      await saveAuthData(token, user);
    } catch {
      await signOut();
    }
  };

  const signOut = async () => {
    try {
      await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      console.error("Error while logging out");
    } finally {
      logout();
      await clearAuthData();
    }
  };

  return { user, token, isAuthenticated, signIn, signOut };
};
