import useSWR from "swr";
import { env } from "utils/env";
import { fetchOrThrow } from "utils/fetchOrThrow";
import { hashPassword } from "utils/hashPassword";
import { z } from "zod";

const requestSchema = z.object({
  email: z.string().email().max(255),
  password: z.string(),
});

const responseSchema = z.object({
  user: z.object({
    id: z.number(),
    user_name: z.string(),
    last_name: z.string(),
    first_name: z.string(),
    sector_id: z.number(),
    email: z.string(),
    phone: z.string(),
    promotion_year: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
  token: z.string(),
});

type requestType = z.infer<typeof requestSchema>;
type responseType = z.infer<typeof responseSchema>;

const fetcher = async (
  url: string,
  data: requestType,
): Promise<responseType> => {
  requestSchema.parse(data);

  // Hash password and password_confirmation
  const hashedPassword = await hashPassword(data.password, data.email);

  const response = await fetchOrThrow(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, password: hashedPassword }),
  });

  const responseData = await response.json();
  responseSchema.parse(responseData);

  return responseData;
};

export const useLogin = (req: requestType) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${env.API_URL}/api/login`,
    (url) => fetcher(url, req),
  );

  return {
    user: data?.user,
    token: data?.token,
    isLoading,
    error,
    mutate,
  };
};

export const login = async (req: requestType) => {
  const response = await fetcher(`${env.API_URL}/api/login`, req);
  return response;
};
