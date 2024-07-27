import { useAuth } from "@/auth/useAuth";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import type { PostsData } from "@app/(tabs)/posts/_features/post.schema";
import { postsFetcher } from "@app/(tabs)/posts/_features/posts.query";

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
    (url) => postsFetcher(url, token || ""),
    { initialSize: 2 }
  );
  return res;
};
