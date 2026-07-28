import { useFetch } from "@/hooks/useFetch";
import {
    OrganizationSchema,
    type OrganizationData,
} from "@/schemas/organizations/organizations.schema";

export const useOrganizations = () => {
  return useFetch<OrganizationData>({
    apiEndpoint: "organization",
    schema: OrganizationSchema,
    queryKey: ["organizations"],
  });
};