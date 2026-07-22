import { useFetch } from "@/hooks/useFetch";
import { SectorsSchema, type SectorsData } from "@/schemas/auth/sectors.schema";

export const useGetSectors = () => {
  return useFetch<SectorsData>({
    apiEndpoint: "/sectors", 
    schema: SectorsSchema,  
    queryKey: ["sectors"],  
  });
};