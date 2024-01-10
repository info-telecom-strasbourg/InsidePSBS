import AsyncStorage from "@react-native-async-storage/async-storage";
import ROUTES from "constants/routes";
import {
  useRootNavigation as useExpoRootNavigation,
  useRouter,
  useSegments,
} from "expo-router";
import { checkUser } from "queries/auth/check-user";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { errorToast } from "utils/toast";

type AuthContextType = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  resetToken: () => void;
};

const AuthContext = createContext<AuthContextType>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProtectedRoute = (token: string, isNavigationReady: boolean) => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isNavigationReady) return;
    if (!token && segments[0] === "(protected)") {
      router.replace(ROUTES.auth);
    } else if (token && segments[0] === "auth") {
      router.push(ROUTES.home);
    }
  }, [isNavigationReady, segments, token]);
};

const useToken = () => {
  const [token, setToken] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (token !== null) return;
    AsyncStorage.getItem("token")
      .then((res) => {
        setToken(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (token === null) return;

    setLoading(true);
    console.log("check token");

    checkUser(token)
      .then(() => {
        AsyncStorage.setItem("token", token);
      })
      .then(() => {
        console.log("token updated");
      })
      .catch(() => {
        errorToast("Votre session a expiré, veuillez vous reconnecter");
        resetToken();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const resetToken = () => {
    router.replace(ROUTES.auth);
    AsyncStorage.removeItem("token");
    setToken(null);
  };

  return { token, setToken, isLoading, resetToken };
};

const useRootNavigation = () => {
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const rootNavigation = useExpoRootNavigation();
  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener("state", () => {
      setIsNavigationReady(true);
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [rootNavigation]);
  return { isNavigationReady };
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { isNavigationReady } = useRootNavigation();
  const { token, setToken, isLoading, resetToken } = useToken();
  useProtectedRoute(token, isNavigationReady);

  return (
    <AuthContext.Provider value={{ token, setToken, isLoading, resetToken }}>
      {children}
    </AuthContext.Provider>
  );
};
