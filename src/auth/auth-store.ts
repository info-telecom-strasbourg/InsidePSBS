import type { LoginUser } from "@/schemas/user.schema";
import { create } from "zustand";

export type AuthState = {
  user: LoginUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: LoginUser, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (user, token) => set({ user, token, isAuthenticated: !!user }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
