import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";

import { z } from "zod";
import { EventSchema } from "./event.schema";

const fetcher = async (url: string, token: string) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const parsedData = EventSchema.safeParse(data);
    return parsedData.data?.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.map((e) => ({ path: e.path, message: e.message }));
      console.error(error);
    }
    console.error(error);
  }
};

export const useEvents = () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/event?per_page=3`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};
