import { DeletePostProvider } from "@/features/post/delete-post.context";
import { ModalRouterProvider } from "@/hooks/useModalRouter";
import { ThemeProvider } from "@/theme/theme-context";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { ModalProvider } from "./modal";

export type ProviderProps = PropsWithChildren<{}>;

export const Provider = ({ children }: ProviderProps) => {
  return (
    <GestureHandlerRootView>
      <ModalProvider>
        <ModalRouterProvider>
          <ThemeProvider>
            <DeletePostProvider>
              <RootSiblingParent>{children}</RootSiblingParent>
            </DeletePostProvider>
          </ThemeProvider>
        </ModalRouterProvider>
      </ModalProvider>
    </GestureHandlerRootView>
  );
};
