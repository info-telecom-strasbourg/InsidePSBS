import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { CategoriesSchema } from "@/schemas/posts/categories.schema";

const fetcher = async (url: string, token: string | null) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = CategoriesSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }
  return parsedData.data.data;
};

export const useFilters = () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/categories`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};
