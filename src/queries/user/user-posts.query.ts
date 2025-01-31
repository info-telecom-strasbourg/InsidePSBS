import { useFetch } from "@/hooks/useFetch";
import { PostsSchema, type PostsData } from "@/schemas/post/post.schema";

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

// export const useShowUserPosts = (id: string | undefined) => {
//   const { token } = useAuth();

//   const res = useFetchInfinite<PostsData["data"]>(
//     (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, id),
//     (url) => postsFetcher(url, token || "")
//   );

//   const hasMore = res.data?.[res.data?.length - 1]?.length ?? 0 > 0;
//   return { ...res, hasMore };
// };

export const useShowUserPosts = (id: string) => {
  const res = useFetch<PostsData>({
    apiEndpoint: `/post?user_id=${id}&page=${pageIndex + 1}`,
    schema: PostsSchema,
    queryKey: ["user", id, "posts"],
  });

  return res;
};
