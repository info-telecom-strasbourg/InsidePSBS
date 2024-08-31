import { z } from "zod";

export const FouailleBalanceSchema = z.object({
  data: z.object({
    balance: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    user_name: z.string(),
  }),
});

export type FouailleBalanceData = z.infer<typeof FouailleBalanceSchema>;
