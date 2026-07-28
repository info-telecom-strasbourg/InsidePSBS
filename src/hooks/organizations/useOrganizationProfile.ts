import { useFetch } from "@/hooks/useFetch";
import {
    ShowOrganization,
    type ShowOrganizationData,
} from "@/schemas/organizations/organization-profile.schema";

export const useOrganizationProfile = (organizationId: string | number) => {
  return useFetch<ShowOrganizationData>({
    apiEndpoint: `organization/${organizationId}`,
    schema: ShowOrganization,
    queryKey: ["organization-profile", String(organizationId)],
  });
};