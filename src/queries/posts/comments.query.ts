import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { CommentsSchema } from "@/schemas/posts/comments.schema";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (data.message) {
    return null;
  }
  const parsedData = CommentsSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data?.data;
};

export const useComments = (id: string | undefined) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${id}/comment?`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};
