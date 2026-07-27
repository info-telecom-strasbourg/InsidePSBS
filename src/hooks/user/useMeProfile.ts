import { useFetch } from "@/hooks/useFetch";
import {
    UserProfileSchema,
    type UserProfileData,
} from "@/schemas/user/user-profile.schema";

export const useMeProfile = () => {
  return useFetch<UserProfileData>({
    apiEndpoint: "user/me",
    schema: UserProfileSchema,
    queryKey: ["user-profile", "me"],
  });
};