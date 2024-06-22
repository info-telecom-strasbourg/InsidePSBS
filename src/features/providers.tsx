import { ModalRouterProvider } from "@/hooks/useModalRouter";
import type { PropsWithChildren } from "react";
import { ThemeProvider } from "../theme/theme-context";

export type ProviderProps = PropsWithChildren<{}>;

export const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      <ModalRouterProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ModalRouterProvider>
    </>
  );
};
