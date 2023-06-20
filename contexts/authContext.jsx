import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import { ERRORS, ROUTES } from "../constants";
import axios from "axios";
import { useLocalStorage } from "./localStorageContext";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProtectedRoute = (token) => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!token && segments[0] !== "(auth)") {
      router.replace(ROUTES.login);
    } else if (token && segments[0] === "(auth)") router.replace(ROUTES.index);
  }, [segments, token]);
};

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const { data, pushData, removeData } = useLocalStorage();

  useProtectedRoute(data.token);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(
        "https://app-pprd.its-tps.fr/api/login",
        { email, password },
        { headers: { Accept: "application/json" } }
      );
      pushData({ token: res.data.token });
      router.replace(ROUTES.index);
    } catch (e) {
      if (e.response.status) setErrorMessage(ERRORS[e.response.status]);
      else console.error(e);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "https://app-pprd.its-tps.fr/api/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      removeData("token");
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
