import { z } from "zod";

export const FouailleSchema = z.object({
  data: z.object({
    balance: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    user_name: z.string().nullable(),
    orders: z
      .array(
        z.object({
          date: z.string(),
          total_price: z.string(),
          amount: z.number(),
          product: z.object({
            name: z.string(),
            title: z.string(),
            unit_price: z.string(),
            color: z.string(),
          }),
        })
      )
      .nullable(),
  }),
  meta: z.object({
    total: z.number(),
    per_page: z.number(),
    current_page: z.number(),
    last_page: z.number(),
    first_page_url: z.string().url(),
    last_page_url: z.string().url().nullable(),
    next_page_url: z.string().nullable(),
    prev_page_url: z.string().nullable(),
    path: z.string().url(),
    from: z.number().nullable(),
    to: z.number().nullable(),
  }),
});

export const FouailleBalanceSchema = z.object({
  data: z.object({
    balance: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    user_name: z.string(),
  }),
});

export type FouailleData = z.infer<typeof FouailleSchema>;

export type FouailleBalanceData = z.infer<typeof FouailleBalanceSchema>;
