import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  // const parsedData = ItsMeUserSchema.safeParse(data);
  // if (!parsedData.success) {
  //   parsedData.error.issues.map((issue) => {
  //     console.error(`${issue.message} -- ON -- ${issue.path}`);
  //   });
  // }

  return data;
};

export const useDefaultImages = () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/user/default`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};
