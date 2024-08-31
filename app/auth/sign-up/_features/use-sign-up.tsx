import { useForm } from "@/hooks/useForm";
import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { signUpSchema, type SignUpData } from "./sign-up.schema";

const defaultValues: SignUpData = {
  email: "",
  password: "",
  password_confirmation: "",
  user_name: "",
  last_name: "",
  first_name: "",
  sector: 0,
  phone: "",
  admission_year: new Date().getFullYear(),
};
// Used to share the form state and dispatch function
type SignUpContextType = ReturnType<typeof useForm> | undefined;
const SignUpContext = createContext<SignUpContextType>(undefined);

// Hook to access the form state and dispatch function
export const useSignUp = () => {
  const context = useContext(SignUpContext);
  if (context === undefined) {
    throw new Error("useSignUp must be used within a SignUpProvider");
  }
  return context;
};

// Provider for the form state and dispatch function
export type SignUpProviderProps = PropsWithChildren<{}>;

export const SignUpProvider = ({ children }: SignUpProviderProps) => {
  const form = useForm({
    defaultValues,
    schema: signUpSchema,
  });

  return (
    <SignUpContext.Provider value={form}>{children}</SignUpContext.Provider>
  );
};
