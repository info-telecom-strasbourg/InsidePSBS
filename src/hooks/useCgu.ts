
//Ce fichier a été mis a part pour reproduire la même hierarchie de dossiers/fichiers que celle des schemas
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