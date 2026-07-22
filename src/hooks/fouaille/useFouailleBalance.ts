import { useFetch } from "@/hooks/useFetch";
import {
    FouailleBalanceSchema,
    type FouailleBalanceData,
} from "@/schemas/fouaille/balance.schema";

export const useFouailleBalance = () => {
  return useFetch<FouailleBalanceData>({
    apiEndpoint: "fouaille/balance",
    schema: FouailleBalanceSchema,
    queryKey: ["fouaille-balance"],
  });
};