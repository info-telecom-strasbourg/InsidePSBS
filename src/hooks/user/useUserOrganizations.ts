import { useFetch } from "@/hooks/useFetch";
import {
    UserOrganizationsSchema,
    type UserOrganizationsData,
} from "@/schemas/user/user-profile.schema";

export const useUserOrganizations = (userId: string | number) => {
  return useFetch<UserOrganizationsData>({
    apiEndpoint: `user/${userId}/organization`,
    schema: UserOrganizationsSchema,
    queryKey: ["user-organizations", String(userId)],
  });
};