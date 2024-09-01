import { validate } from "@/utils/validate";
import type { z } from "zod";
import { displayError } from "./display-error";

export const postQuery = async <T>(
  url: string,
  token: string | null,
  data: T,
  schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>
) => {
  const parsedData = await validate<T>(schema, data);
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(parsedData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const message = await res.json();
    displayError(res, { location: url, message });
    throw new Error("Une erreur est survenue");
  }

  return await res.json();
};
