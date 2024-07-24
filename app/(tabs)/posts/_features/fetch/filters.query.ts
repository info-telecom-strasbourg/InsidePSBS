import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { CategoriesSchema } from "@app/(tabs)/posts/_features/fetch/categories.schema";
import { z } from "zod";

const fetcher = async (url: string, token: string | null) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const parsedData = CategoriesSchema.safeParse(data);
    return parsedData.data?.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.map((e) => ({ path: e.path, message: e.message }));
      console.error(error);
    }
    console.error(error);
  }
};

export const useFilters = (isShown: number | null) => {
  let url = "";
  if (isShown) {
    url = `${process.env.EXPO_PUBLIC_API_URL}/api/categories?is_shown=${isShown}`;
  } else {
    url = `${process.env.EXPO_PUBLIC_API_URL}/api/categories`;
  }
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};
