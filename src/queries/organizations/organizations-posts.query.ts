import { useAuth } from "@/auth/useAuth";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import type { PostsData } from "@/schemas/post/post.schema";
import { postsFetcher } from "../post/posts.query";

const getKey = (
  pageIndex: number,
  previousPageData: PostsData["data"],
  id: string | undefined
) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${process.env.EXPO_PUBLIC_API_URL}/api/post?asso_id=${id}&page=${
    pageIndex + 1
  }`;
};

export const useShowOrganizationPosts = (id: string | undefined) => {
  const { token } = useAuth();

  const res = useFetchInfinite<PostsData["data"]>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, id),
    (url) => postsFetcher(url, token || "")
  );

  const hasMore = res.data?.[res.data?.length - 1]?.length ?? 0 > 0;
  return { ...res, hasMore };
};
