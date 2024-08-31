import { ModalRouterProvider } from "@/hooks/useModalRouter";
import { ThemeProvider } from "@/theme/theme-context";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";

export type ProviderProps = PropsWithChildren<{}>;

export const Provider = ({ children }: ProviderProps) => {
  return (
    <GestureHandlerRootView>
      <ModalRouterProvider>
        <ThemeProvider>
          <RootSiblingParent>{children}</RootSiblingParent>
        </ThemeProvider>
      </ModalRouterProvider>
    </GestureHandlerRootView>
  );
};
