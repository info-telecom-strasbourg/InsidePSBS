import useSWR from "swr";
import { env } from "utils/env";
import { fetchOrThrow } from "utils/fetchOrThrow";
import { z } from "zod";

const responseSchema = z.object({
  title: z.string(),
  sections: z.array(
    z.object({
      title: z.string(),
      content: z.string(),
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

export const useCgu = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${env.API_URL}/api/cgu`,
    (url) => fetcher(url),
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
