import { useAuth } from "@/auth/useAuth";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import type { PostsData } from "@/schemas/posts/post.schema";
import { PostsSchema } from "@/schemas/posts/post.schema";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = PostsSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data?.data;
};

const getKey = (
  pageIndex: number,
  previousPageData: PostsData["data"],
  id: string | undefined
) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${process.env.EXPO_PUBLIC_API_URL}/api/post?user_id=${id}&page=${
    pageIndex + 1
  }`;
};

export const useShowUserPosts = (id: string | undefined) => {
  const { token } = useAuth();

  const res = useFetchInfinite<PostsData["data"]>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, id),
    (url) => fetcher(url, token || ""),
    { initialSize: 2 }
  );
  return res;
};
