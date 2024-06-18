import { z } from "zod";

export const FouailleSchema = z.object({
  balance: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  user_name: z.string().optional().nullable(),
  orders: z.array(
    z.object({
      date: z.string(),
      total_price: z.string(),
      amount: z.number(),
      product: z.object({
        name: z.string(),
        title: z.string(),
        unit_price: z.number(),
        color: z.string(),
      }),
    })
  ),
});

export type FouailleData = z.infer<typeof FouailleSchema>;
