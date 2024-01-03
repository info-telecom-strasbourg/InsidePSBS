import useSWR from "swr";
import { env } from "utils/env";
import { z } from "zod";

const responseSchema = z.object({
  message: z.string(),
});

type responseType = z.infer<typeof responseSchema>;

const fetcher = async (url: string, token: string): Promise<responseType> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await response.json();
  responseSchema.parse(responseData);

  return responseData;
};

export const useLogout = (token: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${env.API_URL}/api/logout`,
    (url) => fetcher(url, token),
  );

  return {
    message: data?.message,
    isLoading,
    error,
    mutate,
  };
};
