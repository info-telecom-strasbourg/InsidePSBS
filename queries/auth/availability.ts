import useSWR from "swr";
import { env } from "utils/env";
import { fetchOrThrow } from "utils/fetchOrThrow";
import { z } from "zod";

const requestSchema = z.object({
  email: z.string().email().max(255).optional(),
  user_name: z.string().min(3).max(30).optional(),
  phone: z.string().min(3).max(10).optional(),
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
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  responseSchema.parse(responseData);

  return responseData;
};

export const useEmailAvailable = (email: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${env.API_URL}/api/register/availability?email=${email}`,
    (url) => fetcher(url, { email }),
  );

  return {
    message: data?.message,
    isLoading,
    error,
    mutate,
  };
};

export const usePhoneAvailable = (phone: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${env.API_URL}/api/register/availability?phone=${phone}`,
    (url) => fetcher(url, { phone }),
  );

  return {
    message: data?.message,
    isLoading,
    error,
    mutate,
  };
};

export const useUsernameAvailable = (user_name: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${env.API_URL}/api/register/availability?username=${user_name}`,
    (url) => fetcher(url, { user_name }),
  );

  return {
    message: data?.message,
    isLoading,
    error,
    mutate,
  };
};
