import useSWR from "swr";
import { env } from "utils/env";
import { fetchOrThrow } from "utils/fetchOrThrow";
import { z } from "zod";

const responseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      short_name: z.string(),
    }),
  ),
});

type responseType = z.infer<typeof responseSchema>;

const fetcher = async (url: string): Promise<responseType> => {
  const response = await fetchOrThrow(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  responseSchema.parse(responseData);

  return responseData;
};

export const useSectors = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${env.API_URL}/api/sector`,
    (url) => fetcher(url),
  );

  return {
    data: data?.data,
    isLoading,
    error,
    mutate,
  };
};
