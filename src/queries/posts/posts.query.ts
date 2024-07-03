import { useAuth } from "@/auth/useAuth";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import { PostsSchema } from "@/schemas/posts/post.schema";
import { z } from "zod";

const fetcher = async (url: string, token: string) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const parsedData = PostsSchema.safeParse(data);
    return parsedData.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.map((e) => ({ path: e.path, message: e.message }));
      console.error(error);
    }
    console.error(error);
  }
};

const getKey = (
  pageIndex: number,
  selectedId: number,
  searchPhrase: string
) => {
  return `${
    process.env.EXPO_PUBLIC_API_URL
  }/api/post?category_id=${selectedId}&search=${searchPhrase}&per_page=10&page=${
    pageIndex + 1
  }`;
};

export const usePosts = (selectedId: number, searchPhrase: string) => {
  const { token } = useAuth();

  const res = useFetchInfinite(
    (pageIndex) => getKey(pageIndex, selectedId, searchPhrase),
    (url) => fetcher(url, token || "")
  );

  return res;
};
