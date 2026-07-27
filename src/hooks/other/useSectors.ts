import { useFetch } from "@/hooks/useFetch";
import { z } from "zod";

const SectorsSchema = z.object({
  data: z.array(
    z.object({
      id: z.number().int(),
      name: z.string(),
      short_name: z.string(),
    })
  ),
});

export const useSectors = () => {
  return useFetch({
    apiEndpoint: "api/sector",
    schema: SectorsSchema,
    queryKey: ["sectors"],
  });
};