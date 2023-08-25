import { createContext, useContext, useEffect, useState } from "react";
import { useRootNavigation, useRouter, useSegments } from "expo-router";
import { API, ERRORS, ROUTES } from "../constants";
import axios from "axios";
import { useLocalStorage } from "./localStorageContext";
import * as Crypto from "expo-crypto";
const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProtectedRoute = (token) => {
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
    } else if (token && segments[0] === "auth") router.push(ROUTES.home);
  }, [isNavigationReady, segments, token]);
};

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const { data, pushData, removeData } = useLocalStorage();

  useProtectedRoute(data.token);

  const login = async ({ email, password }) => {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password + email
    );

    try {
      const res = await axios.post(
        `${API.url}/api/login`,
        { email, password: hashedPassword },
        { headers: { ...API.headers } }
      );
      pushData({ token: res.data.token });
    } catch (e) {
      console.log(e.response);
      if (e.response.status) setErrorMessage(ERRORS[e.response.status]);
      // TODO ROMAIN error message does'nt work
      else console.error(e);
    }
  };

  const logout = async () => {
    try {
      removeData("token");
      await axios.post(`${API.url}/api/logout`, {
        headers: {
          ...API.headers,
          Authorization: `Bearer ${data.token}`,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <AuthContext.Provider value={{ login, logout, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
