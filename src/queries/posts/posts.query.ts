import { useAuth } from "@/auth/useAuth";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
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
