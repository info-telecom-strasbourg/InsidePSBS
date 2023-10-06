import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useRootNavigation, useRouter, useSegments } from "expo-router";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  useProtectedRoute();

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

const useProtectedRoute = async () => {
  const { getItem: getToken } = useAsyncStorage("token");
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();
  const rootNavigation = useRootNavigation();

  useEffect(() => {
    if (!rootNavigation) return;
    const unsubscribe = rootNavigation.addListener("state", () => {
      setIsNavigationReady(true);
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [rootNavigation]);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!isNavigationReady) return;
      if (!token && segments[0] !== "(public)") return router.replace("/"); // a modifier avec les vraies routes
      if (token && segments[1] === "auth") router.replace("/");
    })();
  }, [isNavigationReady, segments]);
};
