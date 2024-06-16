import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import type { PersistOptions } from "zustand/middleware";
import { persist } from "zustand/middleware";

export type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export type AuthStore = AuthState & PersistOptions<AuthState>;

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: async (name) => {
          const item = await AsyncStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
) as () => AuthStore;
