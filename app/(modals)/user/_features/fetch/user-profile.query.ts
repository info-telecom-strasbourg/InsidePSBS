import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { UserProfileSchema } from "./user-profile.schema";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = UserProfileSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data?.data;
};

export const useShowUserProfile = (id: string | undefined) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/user/${id}`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};
