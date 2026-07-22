import { useFetch } from "@/hooks/useFetch";
import {
    UserProfileSchema,
    type UserProfileData,
} from "@/schemas/user/user-profile.schema";

export const useUserProfile = (userId: string | number) => {
  return useFetch<UserProfileData>({
    apiEndpoint: `user/${userId}`,
    schema: UserProfileSchema,
    queryKey: ["user-profile", String(userId)],
  });
};