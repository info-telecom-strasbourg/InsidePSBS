import { useRouter, useSegments } from "expo-router";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

export type ModalRouterContextType = {
  close: () => void;
  open: (route: string) => void;
};

const ModalRouterContext = createContext<ModalRouterContextType>({
  close: () => {},
  open: () => {},
});

export const useModalRouter = () => {
  return useContext(ModalRouterContext);
};

export type ModalRouterProviderProps = PropsWithChildren<{}>;

export const ModalRouterProvider = ({ children }: ModalRouterProviderProps) => {
  const [previousRoute, setPreviousRoute] = useState<string | null>(null);
  const router = useRouter();
  const segments = useSegments();

  const open = (route: string) => {
    const currentRoute = segments[segments.length - 1] || "/";
    setPreviousRoute(currentRoute);
    router.push(route);
  };

  const close = () => {
    if (previousRoute) {
      router.navigate(previousRoute);
      setPreviousRoute(null);
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <ModalRouterContext.Provider value={{ open, close }}>
      {children}
    </ModalRouterContext.Provider>
  );
};
