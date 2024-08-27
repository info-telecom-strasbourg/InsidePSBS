import { useAuth } from "@/auth/useAuth";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import { z } from "zod";
import type { CommentsData } from "./comments.schema";
import { CommentsSchema } from "./comments.schema";

const fetcher = async (url: string, token: string) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    const parsedData = CommentsSchema.safeParse(data);
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
  previousPageData: CommentsData["data"],
  postId: string
) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${
    process.env.EXPO_PUBLIC_API_URL
  }/api/post/${postId}/comment?per_page=10&page=${pageIndex + 1}`;
};

export const useComments = (postId: string) => {
  const { token } = useAuth();

  const res = useFetchInfinite<CommentsData["data"]>(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, postId),

    (url) => fetcher(url, token || "")
  );
  const hasMore = res.data?.[res.data?.length - 1]?.length ?? 0 > 0;

  return { ...res, hasMore };
};
