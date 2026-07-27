import { useFetch } from "@/hooks/useFetch";
import { z } from "zod";

const MpsSchema = z.object({
  link: z.string(),
});

export const useMps = () => {
  return useFetch({
    apiEndpoint: "api/mps",
    schema: MpsSchema,
    queryKey: ["mps"],
  });
};
