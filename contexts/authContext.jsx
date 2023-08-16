import { createContext, useContext, useEffect, useState } from "react";
import { useRootNavigation, useRouter, useSegments } from "expo-router";
import { API, ERRORS, ROUTES } from "../constants";
import axios from "axios";
import { useLocalStorage } from "./localStorageContext";

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
    } else if (token && segments[0] === "auth") router.replace(ROUTES.index);
  }, [segments, token]);
};

export const AuthProvider = ({ children }) => {
  console.log("rendering AuthProvider");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const { data, pushData, removeData } = useLocalStorage();

  useProtectedRoute(data.token);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(
        `${API.url}/api/login`,
        { email, password },
        { headers: { ...API.headers } }
      );
      pushData({ token: res.data.token });
      router.replace(ROUTES.home);
    } catch (e) {
      if (e.response.status) setErrorMessage(ERRORS[e.response.status]);
      else console.error(e);
    }
  };

  const logout = async () => {
    try {
      removeData("token");
      await axios.post(
        `${API.url}/api/logout`,
        {},
        {
          headers: {
            ...API.headers,
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
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
