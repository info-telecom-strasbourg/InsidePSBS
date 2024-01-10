import useSWR from "swr";
import { env } from "utils/env";
import { fetchOrThrow } from "utils/fetchOrThrow";
import { z } from "zod";

const responseSchema = z.object({
  message: z.string(),
});

type responseType = z.infer<typeof responseSchema>;

const fetcher = async (url: string, token: string): Promise<responseType> => {
  try {
    const response = await fetchOrThrow(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();
    responseSchema.parse(responseData);

    return responseData;
  } catch (error) {
    const errorMessage = await error.json();
    console.log(errorMessage);
    throw errorMessage;
  }
};

export const useVerifyEmail = (token: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${env.API_URL}/api/email/verification-notification`,
    (url) => fetcher(url, token),
  );

  return {
    message: data?.message,
    isLoading,
    error,
    mutate,
  };
};

export const verifyEmail = async (token: string) => {
  console.log(token);
  const response = await fetcher(
    `${env.API_URL}/api/email/verification-notification`,
    token,
  );
  console.log(response);
  return response;
};
