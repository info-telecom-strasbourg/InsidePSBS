import { validate } from "@/utils/validate";
import type { z } from "zod";

export const postQuery = async <T>(
  url: string,
  token: string | null,
  data: T,
  schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>
) => {
  try {
    const parsedData = await validate<T>(schema, data);
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(parsedData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
