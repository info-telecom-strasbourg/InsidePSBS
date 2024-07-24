import { useFetch } from "@/hooks/useFetch";
import { CguSchema } from "@/schemas/cgu.schema";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  const parsedData = CguSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data;
};

export const useCGU = () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/cgu`;

  const res = useFetch(url, (url: string) => fetcher(url));
  return res;
};
