import { z } from "zod";

export const FouailleSchema = z.object({
  data: z.object({
    balance: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    orders: z
      .array(
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
      )
      .nullable(),
    user_name: z.string().nullable(),
  }),
  meta: z.object({
    total: z.number(),
    per_page: z.number(),
    current_page: z.number(),
    last_page: z.number(),
    first_page_url: z.string(),
    last_page_url: z.string().nullable(),
    next_page_url: z.string().nullable(),
    prev_page_url: z.string().nullable(),
    path: z.string(),
    from: z.number().nullable(),
    to: z.number().nullable(),
  }),
});

export type FouailleData = z.infer<typeof FouailleSchema>;
