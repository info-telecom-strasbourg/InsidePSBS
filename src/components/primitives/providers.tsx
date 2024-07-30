import { ModalRouterProvider } from "@/hooks/useModalRouter";
import { ThemeProvider } from "@/theme/theme-context";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
