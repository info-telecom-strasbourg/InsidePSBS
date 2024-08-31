import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { ShowOrganization } from "@/schemas/organizations/organization-profile.schema";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = ShowOrganization.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data;
};

export const useShowOrganization = (id: string | undefined) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/organization/${id}`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};
