import { useFetch } from "@/hooks/useFetch";
import { ItsMeUserSchema } from "@/schemas/profile/me.schema";

export const useMe = () => {
  const res = useFetch({
    apiEndpoint: "api/user/me",
    schema: ItsMeUserSchema,
    queryKey: ["user", "me"],
  });

  return res;
};
