import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { FouailleBalanceSchema } from "@/schemas/GET/fouaille/balance.schema";
import { z } from "zod";

export const balanceFetcher = async (url: string, token: string) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const parsedData = FouailleBalanceSchema.safeParse(data);
    return parsedData.data?.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.map((e) => ({ path: e.path, message: e.message }));
      console.error(error);
    }
    console.error(error);
  }
};

export const useBalance = () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille/balance`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => balanceFetcher(url, token || ""));
  return res;
};
