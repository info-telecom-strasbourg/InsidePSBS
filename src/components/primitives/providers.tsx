import { ModalRouterProvider } from "@/hooks/useModalRouter";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "../theme/theme-context";

export type ProviderProps = PropsWithChildren<{}>;

export const Provider = ({ children }: ProviderProps) => {
  return (
    <GestureHandlerRootView>
      <ModalRouterProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ModalRouterProvider>
    </GestureHandlerRootView>
  );
};
