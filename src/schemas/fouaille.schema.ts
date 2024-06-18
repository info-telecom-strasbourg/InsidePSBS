import { z } from "zod";

export const FouailleSchema = z.object({
  data: z.object({
    balance: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    user_name: z.string() || z.null(),
    orders: z.array(
      z.object({
        date: z.string(),
        total_price: z.string(),
        amount: z.number(),
        product:
          z.object({
            name: z.string(),
            title: z.string(),
            unit_price: z.number(),
            color: z.string(),
          }) || z.null(),
      })
    ),
  }),
  meta: z.object({
    total: z.number(),
    per_page: z.number(),
    current_page: z.number(),
    last_page: z.number(),
    first_page_url: z.string(),
    last_page_url: z.string(),
    next_page_url: z.string(),
    prev_page_url: z.string(),
    path: z.string(),
    from: z.number() || z.null(),
    to: z.number() || z.null(),
  }),
});

export type FouailleData = z.infer<typeof FouailleSchema>;
