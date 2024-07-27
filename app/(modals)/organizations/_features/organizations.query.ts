import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { OrganizationSchema } from "@app/(modals)/organizations/_features/organizations.schema";

const fetcher = async (url: string, token: string | null) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = OrganizationSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data?.data;
};

export const useIndexOrganizations = (searchPhrase: string) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/organization?search=${searchPhrase}`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};
