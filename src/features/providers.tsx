import type { PropsWithChildren } from "react";
import { ThemeProvider } from "../theme/theme-context";

export type ProviderProps = PropsWithChildren<{}>;

export const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
};
