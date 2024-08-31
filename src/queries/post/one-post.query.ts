import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { ReactionTypeSchema } from "@/schemas/post/add-reaction.schema";
import { SinglePostSchema } from "@/schemas/post/post.schema";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = SinglePostSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data?.data;
};

export const useOnePost = (id: string | undefined) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/${id}`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};

const reactionTypefetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = ReactionTypeSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data?.data;
};

export const useReactionType = () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post/2/reactiontype`;

  const { token } = useAuth();

  const res = useFetch(url, (url: string) =>
    reactionTypefetcher(url, token || "")
  );
  return res;
};
