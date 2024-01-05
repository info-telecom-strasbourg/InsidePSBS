import { env } from "utils/env";
import { fetchOrThrow } from "utils/fetchOrThrow";
import { hashPassword } from "utils/hashPassword";
import { z } from "zod";

const requestSchema = z.object({
  user_name: z.string().min(3).max(30).optional(),
  last_name: z.string().min(3).max(255),
  first_name: z.string().min(3).max(255),
  sector: z.number(),
  email: z.string().email().max(255),
  phone: z.string().min(3).max(10).optional(),
  promotion_year: z.number().min(2000).max(3000).optional(),
  password: z.string(),
  password_confirmation: z.string(),
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
    promotion_year: z.number(),
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
  // Validate request data
  requestSchema.parse(data);

  // Hash password and password_confirmation
  const hashedPassword = await hashPassword(data.password, data.email);
  const hashedPasswordConfirmation = await hashPassword(
    data.password_confirmation,
    data.email,
  );

  const response = await fetchOrThrow(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      password: hashedPassword,
      password_confirmation: hashedPasswordConfirmation,
    }),
  });

  const responseData = await response.json();
  responseSchema.parse(responseData);

  return responseData;
};

export const register = async (req: requestType) => {
  const response = await fetcher(`${env.API_URL}/api/register`, req);
  return response;
};
