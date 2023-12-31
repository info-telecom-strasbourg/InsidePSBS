import axios from "axios";
import * as Crypto from "expo-crypto";
import { useRootNavigation, useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

import { useLocalStorage } from "./localStorageContext";
import { useTheme } from "./themeContext";
import { API, ERRORS, ROUTES, TEXT, COLORS } from "../constants";
import toast from "../utils/toast";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProtectedRoute = () => {
  const { data, pushData, removeData } = useLocalStorage();
  const token = data.token;
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();
  const rootNavigation = useRootNavigation();
  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener("state", () => {
      setIsNavigationReady(true);
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [rootNavigation]);

  useEffect(() => {
    if (!isNavigationReady) return;
    if (!token && segments[0] !== "auth") {
      router.replace(ROUTES.auth);
    } else if (token && segments[0] === "auth" && segments[1] !== "cgu") {
      // not really clean but CGU is the only page that can be accessed with and without being logged in
      router.push(ROUTES.home);
    }
  }, [isNavigationReady, segments, token]);
};

export const AuthProvider = ({ children }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const { data, pushData, removeData } = useLocalStorage();

  useProtectedRoute();

  const reset_email = async (token) => {
    try {
      const res = await axios.post(
        `${API.url}/api/email/verification-notification`,
        {},
        {
          headers: {
            ...API.headers,
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.status === 200) {
        toast(TEXT.authentification.verify_email.toast_message, {
          backgroundColor: COLORS.light_green,
          textColor: COLORS.dark_green,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const login = async ({ email, password }) => {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password + email,
    );

    try {
      const res = await axios.post(
        `${API.url}/api/login`,
        { email, password: hashedPassword },
        { headers: { ...API.headers } },
      );
      if (res.status === 200) pushData({ token: res.data.token });
    } catch (e) {
      console.log(e);
      console.log(e.response);
      if (e.response.status) setErrorMessage(ERRORS[e.response.status]);
      if (e.response.status === 409) {
        return e.response.data.token;
      }
      // TODO ROMAIN error message does'nt work
      else console.error(e);
    }
    return null;
  };

  const logout = async () => {
    try {
      console.log("trying to logout");
      await removeData("token");
      console.log(data.token);
      await axios.post(
        `${API.url}/api/logout`,
        {},
        {
          headers: {
            ...API.headers,
            Authorization: `Bearer ${data.token}`,
          },
        },
      );
      console.log("logged out,replacing the route");
      router.replace(ROUTES.auth);
    } catch (e) {
      console.error("error while logout", e);
      console.error("error while logout", e.response);
    }
  };
  return (
    <AuthContext.Provider
      value={{ login, logout, errorMessage, setErrorMessage, reset_email }}>
      {children}
    </AuthContext.Provider>
  );
};
