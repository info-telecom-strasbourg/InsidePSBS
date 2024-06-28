import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { SinglePostSchema } from "@/schemas/posts/post.schema";
import { useLocalSearchParams } from "expo-router";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = SinglePostSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }
  return parsedData.data.data;
};

export const useOnePost = () => {
  const local = useLocalSearchParams();
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${local.id}`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};
