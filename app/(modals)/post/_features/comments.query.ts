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
<<<<<<< HEAD
  postId: string,
  parentCommentId: number | null
=======
  postId: string
>>>>>>> f8a6610 (recursive component and fetching children done)
) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${
    process.env.EXPO_PUBLIC_API_URL
<<<<<<< HEAD
  }/api/post/${postId}/comment?per_page=10&parent_comment_id=${parentCommentId}&page=${
    pageIndex + 1
  }`;
};

export const useComments = (postId: string, parentCommentId: number | null) => {
=======
  }/api/post/${postId}/comment?per_page=10&page=${pageIndex + 1}`;
};

export const useComments = (postId: string) => {
>>>>>>> f8a6610 (recursive component and fetching children done)
  const { token } = useAuth();

  const res = useFetchInfinite<CommentsData["data"]>(
    (pageIndex, previousPageData) =>
<<<<<<< HEAD
      getKey(pageIndex, previousPageData, postId, parentCommentId),
=======
      getKey(pageIndex, previousPageData, postId),
>>>>>>> f8a6610 (recursive component and fetching children done)
    (url) => fetcher(url, token || "")
  );
  const hasMore = res.data?.[res.data?.length - 1]?.length ?? 0 > 0;

  return { ...res, hasMore };
};
