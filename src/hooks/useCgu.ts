import { useFetch } from "@/hooks/useFetch";
import {
    CguSchema,
    type CguData,
} from "@/schemas/cgu.schema";

export const useCgu = () => {
  return useFetch<CguData>({
    apiEndpoint: "cgu",
    schema: CguSchema,
    queryKey: ["cgu"],
  });
};