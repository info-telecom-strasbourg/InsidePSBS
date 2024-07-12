import { useAuth } from "@/auth/useAuth";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import type { PostsData } from "@/schemas/GET/posts/post.schema";
import { PostsSchema } from "@/schemas/GET/posts/post.schema";
import { z } from "zod";

export const postsFetcher = async (url: string, token: string) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const parsedData = PostsSchema.safeParse(data);
    return parsedData.data?.data;
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
  previousPageData: PostsData["data"],
  selectedId: number,
  searchPhrase: string
) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${
    process.env.EXPO_PUBLIC_API_URL
  }/api/post?category_id[]=${selectedId}&search=${searchPhrase}&per_page=10&page=${
    pageIndex + 1
  }`;
};

export const usePosts = (selectedId: number, searchPhrase: string) => {
  const { token } = useAuth();

  const res = useFetchInfinite<PostsData["data"]>(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, selectedId, searchPhrase),
    (url) => postsFetcher(url, token || ""),
    { initialSize: 2 }
  );

  return res;
};
