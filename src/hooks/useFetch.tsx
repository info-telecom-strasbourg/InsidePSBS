import { useAuth } from "@/auth/useAuth";
import { FetchError, zodFetchWithToken } from "@/utils/fetch";
import { toastError } from "@/utils/toast";
import type { QueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const fetcher = async (
  apiEndpoint: string,
  schema: z.ZodSchema,
  token: string | null,
  fetchOptions?: RequestInit
) => {
  try {
    if (!token) throw new Error("Unauthorized");
    const res = await zodFetchWithToken(apiEndpoint, token, {
      method: "GET",
      ...fetchOptions,
    });
    const data = await res.json();

    const parsedData = await schema.parseAsync(data);
    return parsedData;
  } catch (error) {
    if (error instanceof FetchError) {
      toastError(error.message);
    } else if (error instanceof z.ZodError) {
      error.issues.map((e) => ({ path: e.path, message: e.message }));
      console.error(error);
    } else {
      toastError("Une erreur est survenue");
    }
    throw error;
  }
};

export const useFetch = ({
  apiEndpoint,
  schema,
  fetchOptions,
  queryKey,
  queryOptions,
}: {
  apiEndpoint: string;
  schema: z.ZodSchema;
  fetchOptions?: RequestInit;
  queryKey: string[];
  queryOptions?: QueryOptions;
}) => {
  const { token } = useAuth();

  const res = useQuery({
    queryKey: queryKey,
    queryFn: () => fetcher(apiEndpoint, schema, token, fetchOptions),
    ...queryOptions,
  });
  return res;
};
