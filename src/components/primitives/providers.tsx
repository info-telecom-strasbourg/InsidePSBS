import { DeletePostProvider } from "@/features/post/delete-post.context";
import { ModalRouterProvider } from "@/hooks/useModalRouter";
import { ThemeProvider } from "@/theme/theme-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";

export type ProviderProps = PropsWithChildren<{}>;

const queryClient = new QueryClient();

export const Provider = ({ children }: ProviderProps) => {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ModalRouterProvider>
            <DeletePostProvider>
              <RootSiblingParent>{children}</RootSiblingParent>
            </DeletePostProvider>
          </ModalRouterProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};
