import { useAuth } from "@/auth/useAuth";
import { ItsMeUserSchema } from "@/schemas/profile/me.schema";
import { FetchError, zodFetchWithToken } from "@/utils/fetch";
import { toastError } from "@/utils/toast";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const fetcher = async (token: string | null) => {
  try {
    if (!token) throw new Error("Unauthorized");
    const res = await zodFetchWithToken("api/user/me", token, {
      method: "GET",
    });
    const data = await res.json();

    const parsedData = await ItsMeUserSchema.parseAsync(data);
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

export const useMe = () => {
  const { token } = useAuth();

  const res = useQuery({
    queryKey: ["user", "me"],
    queryFn: () => fetcher(token),
  });
  return res;
};

//open pull request
