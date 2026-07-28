import { useFetch } from "@/hooks/useFetch";
import { z } from "zod";

export const useCts = () => {
  return useFetch({
    apiEndpoint: "api/cts",
    schema: z.any(),
    queryKey: ["cts"],
  });
};