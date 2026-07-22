import { useFetch } from "@/hooks/useFetch";
import {
    ItsMeUserSchema,
    type ItsMeUserData,
} from "@/schemas/profile/me.schema";

export const useMeProfile = () => {
  return useFetch<ItsMeUserData>({
    apiEndpoint: "user/me",
    schema: ItsMeUserSchema,
    queryKey: ["me-profile"],
  });
};