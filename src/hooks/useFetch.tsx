import { useAuth } from "@/auth/useAuth";
import { FetchError, zodFetchWithToken } from "@/utils/fetch";
import { toastError } from "@/utils/toast";
import type { QueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const getFetcher = async <T,>(
  apiEndpoint: string,
  schema: z.ZodSchema,
  token: string | null,
  fetchOptions?: RequestInit
): Promise<T> => {
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
      const formattedErrors = error.issues.map((e) => ({
        path: e.path,
        message: e.message,
      }));
      formattedErrors.forEach(({ path, message }) => {
        // eslint-disable-next-line no-console
        console.error(`Path : ${path}\nMessage : ${message}\n`);
      });
      toastError("Erreur d'interprétation de la réponse du serveur - schéma");
    } else {
      toastError("Une erreur est survenue");
    }
    throw error;
  }
};

export const useFetch = <T,>({
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
  queryOptions?: QueryOptions<T>;
}) => {
  const { token } = useAuth();

  const res = useQuery<T, FetchError | z.ZodError | Error>({
    queryKey: queryKey,
    queryFn: () => getFetcher<T>(apiEndpoint, schema, token, fetchOptions),
    ...queryOptions,
  });
  return res;
};
