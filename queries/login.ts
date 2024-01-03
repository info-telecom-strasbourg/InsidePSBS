import useSWR from "swr";
import { env } from "utils/env";
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
    sector: z.number(),
    email: z.string(),
    phone: z.string(),
    promotion_year: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
  token: z.string(),
});

const errorSchema = z.object({
  message: z.string().array(),
});

type requestType = z.infer<typeof requestSchema>;
type responseType = z.infer<typeof responseSchema>;

const fetcher = async (
  url: string,
  data: requestType,
): Promise<responseType> => {
  try {
    requestSchema.parse(data);

    // Hash password and password_confirmation
    const hashedPassword = await hashPassword(data.password, data.email);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, password: hashedPassword }),
    });

    const responseData = await response.json();
    responseSchema.parse(responseData);

    return responseData;
  } catch (error) {
    if (error.status === 401) {
      errorSchema.parse(error);
      throw error; // It is possible to add another error handling here
    }
    throw error;
  }
};

export const useLogin = (userData: requestType) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${env.API_URL}/api/login`,
    (url) => fetcher(url, userData),
  );

  return {
    user: data?.user,
    token: data?.token,
    isLoading,
    error,
    mutate,
  };
};
