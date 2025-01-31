import { useFetch } from "@/hooks/useFetch";
import type { ItsMeUserData } from "@/schemas/profile/me.schema";
import { ItsMeUserSchema } from "@/schemas/profile/me.schema";

export const useMe = () => {
  const res = useFetch<ItsMeUserData>({
    apiEndpoint: "/user/me",
    schema: ItsMeUserSchema,
    queryKey: ["user", "me"],
  });

  return res;
};
