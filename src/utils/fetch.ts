import { validate } from "@/utils/validate";
import type { ZodSchema } from "zod";
import { logError } from "./log-error";

export class FetchError extends Error {
  status: number;

  constructor(res: Response) {
    super(res.statusText);
    this.name = "FetchError";
    this.status = res.status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }
  }
}

export const zodFetch = async <T>(
  url: string,
  { data, schema, ...init }: RequestInit & { schema?: ZodSchema<T>; data?: T }
) => {
  const body = JSON.stringify(
    schema && data ? await validate(schema, data) : data || data
  );

  const headers = {
    ...(data ? { "Content-Type": "application/json" } : {}),
    ...init?.headers,
  };

  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${url}`, {
    body,
    ...init,
    headers,
  });

  if (!res.ok) {
    logError(res, { location: url });
    throw new FetchError(res);
  }

  return res;
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
