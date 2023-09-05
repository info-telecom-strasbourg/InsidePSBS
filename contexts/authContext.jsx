import { createContext, useContext, useEffect, useState } from "react";
import { useRootNavigation, useRouter, useSegments } from "expo-router";
import toast from "../utils/toast"
import { useTheme } from "./themeContext";
import { API, ERRORS, ROUTES, TEXT } from "../constants";
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
  const { theme } = useTheme();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const { data, pushData, removeData } = useLocalStorage();

  useProtectedRoute(data.token);

  const reset_email = async (token) => {
    try {
      const res = await axios.post(
<<<<<<< HEAD
        `${API.url}/api/email/verification-notification`,
        {
          headers: {
            ...API.headers,
            Authorization: `Bearer ${token}`,
          },
        }
      );
=======
        `${API.url}/api/email/verification-notification`, {}, {
        headers: {
          ...API.headers,
          Authorization: `Bearer ${token}`,
        },
      })
>>>>>>> c020ba9bd839fc1a04e5041243537056d9ab6544
      if (res.status === 200) {
        toast(TEXT.authentification.verify_email.toast_message, {
          backgroundColor: theme.box,
          textColor: theme.text,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

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
      removeData("token");
      console.log(data.token);
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
      console.log("logged out,replacing the route");
      router.replace(ROUTES.index);
    } catch (e) {
      console.error("error while logout", e);
      console.error("error while logout", e.response);
    }
  };
  return (
    <AuthContext.Provider
      value={{ login, logout, errorMessage, setErrorMessage, reset_email }}
    >
      {children}
    </AuthContext.Provider>
  );
};
