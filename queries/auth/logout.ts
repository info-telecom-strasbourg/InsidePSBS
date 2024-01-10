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

export const logout = async (token: string) => {
  const response = await fetcher(`${env.API_URL}/api/logout`, token);
  return response;
};
