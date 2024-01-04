import useSWR from "swr";
import { env } from "utils/env";
import { fetchOrThrow } from "utils/fetchOrThrow";
import { z } from "zod";

const requestSchema = z.object({
  email: z.string().email().max(255),
});

const responseSchema = z.object({
  message: z.string(),
});

type requestType = z.infer<typeof requestSchema>;
type responseType = z.infer<typeof responseSchema>;

const fetcher = async (
  url: string,
  data: requestType,
): Promise<responseType> => {
  requestSchema.parse(data);

  const response = await fetchOrThrow(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  responseSchema.parse(responseData);

  return responseData;
};

export const useForgotPassword = (req: requestType) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${env.API_URL}/api/forgot-password`,
    (url) => fetcher(url, req),
  );

  return {
    message: data?.message,
    isLoading,
    error,
    mutate,
  };
};
