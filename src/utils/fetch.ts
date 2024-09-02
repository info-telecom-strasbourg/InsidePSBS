import { validate } from "@/utils/validate";
import type { ZodSchema } from "zod";
import { displayError } from "./display-error";

export const zodFetch = async <T>(
  url: string,
  { data, schema, ...init }: RequestInit & { schema?: ZodSchema<T>; data?: T }
) => {
  const body = JSON.stringify(
    schema && data ? await validate(schema, data) : data || init?.body
  );

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/${url}`, {
    body,
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    displayError(res, { location: url });
    throw new Error("Une erreur est survenue.");
  }

  return await res.json();
};

export const zodFetchWithToken = async <T>(
  url: string,
  token: string | null,
  init?: RequestInit & { schema?: ZodSchema<T>; data?: T }
) => {
  return await zodFetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
    ...init,
  });
};
