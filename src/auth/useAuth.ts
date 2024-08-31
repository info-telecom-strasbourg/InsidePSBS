import { clearAuthData, getAuthData, saveAuthData } from "@/auth/auth-storage";
import { useAuthStore } from "@/auth/auth-store";
import { routes } from "@/constants/routes";
import * as Crypto from "expo-crypto";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export const useAuth = () => {
  const { user, token, isAuthenticated, setUser, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const loadAuthData = async () => {
      const { token, user } = await getAuthData();
      if (token && user) {
        setUser(user, token);
      }
    };
    loadAuthData();
  }, [setUser]);
  // NOTE: this is signIn is only used for dev purposes, has to be removed in futures releases
  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (isAuthenticated) {
      console.error("User already authenticated");
      return;
    }

    try {
      const passwordHash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `${password}${email}`
      );
      const toSend = { email, password: passwordHash };
      console.log("SignIn data:", toSend);
      const { token, user } = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(toSend),
        }
      )
        .then((res) => res.json())
        .catch((err) => {
          console.error(err);
        });
      setUser(user, token);
      router.push(routes.home as Href);

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
      router.push(routes.root as Href);
    }
  };

  return { user, token, isAuthenticated, signIn, signOut };
};
