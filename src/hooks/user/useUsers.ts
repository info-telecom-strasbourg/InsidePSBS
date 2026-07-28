import { useFetch } from "@/hooks/useFetch";
import {
    UsersSchema,
    type UsersData,
} from "@/schemas/user/user-profile.schema";

interface UserSearchParams {
  search?: string;
  sector_id?: number;
}

export const useUsers = (params?: UserSearchParams) => {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.append("search", params.search);
  if (params?.sector_id) searchParams.append("sector_id", String(params.sector_id));

  const queryString = searchParams.toString();
  const apiEndpoint = queryString ? `user?${queryString}` : "user";

  return useFetch<UsersData>({
    apiEndpoint,
    schema: UsersSchema,
    queryKey: ["users", "list", queryString],
  });
};