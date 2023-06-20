import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import { ERRORS, ROUTES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loadData = () => {
      AsyncStorage.getItem("token")
        .then((value) => value && setToken(value))
        .catch((e) => console.error(e));
    };

    loadData();
  }, []);

  useProtectedRoute(token);

  const login = async ({ email, password }) => {
    try {
      // const res = await axios.post(
      //   "https://app-pprd.its-tps.fr/api/login",
      //   { email, password },
      //   { headers: { Accept: "application/json" } }
      // );
      const res = {
        data: {
          token: "test",
        },
      };
      await AsyncStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      router.replace(ROUTES.index);
    } catch (e) {
      console.error(`${e.response.status} : ${e.response.data.message}`);
      setErrorMessage(ERRORS[e.response.status]);
    }
  };

  const logout = async () => {
    try {
      // await axios.post(
      //   "https://app-pprd.its-tps.fr/api/logout",
      //   { token },
      //   { headers: { Accept: "application/json" } }
      // );
      await AsyncStorage.removeItem("token");
      setToken(null);
    } catch (e) {
      setErrorMessage(ERRORS[e.response.status]);
    }
  };
  return (
    <AuthContext.Provider value={{ login, logout, token, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
