import useSWR from "swr";
import { env } from "utils/env";
import { fetchOrThrow } from "utils/fetchOrThrow";
import { z } from "zod";

const responseSchema = z.object({
  message: z.string(),
});

type responseType = z.infer<typeof responseSchema>;

const fetcher = async (url: string, token: string): Promise<responseType> => {
  const response = await fetchOrThrow(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await response.json();
  responseSchema.parse(responseData);

  return responseData;
};

export const useCheckUser = (token: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${env.API_URL}/api/check`,
    (url) => fetcher(url, token),
  );

  return {
    message: data?.message,
    isLoading,
    error,
    mutate,
  };
};

export const checkUser = async (token: string) => {
  const response = await fetcher(`${env.API_URL}/api/check`, token);

  return response;
};
