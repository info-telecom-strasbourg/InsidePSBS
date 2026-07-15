import { z } from "zod";

export const OrdersSchema = z.object({
  data: z.object({
    orders: z.array(
      z.object({
        date: z.string(),
        date_format: z.string(),
        actual_balance: z.number(),
        total_price: z.string(),
        amount: z.number(),
        product: z
          .object({
            name: z.string(),
            type: z.string(),
            unit_price: z.string(),
          })
          .nullable(),
      })
    ),
  }),
  meta: z.object({
    total: z.number(),
    per_page: z.int(),
    current_page: z.int(),
    last_page: z.int(),
    first_page_url: z.url(),
    last_page_url: z.url(),
    next_page_url: z.url().nullable(),
    prev_page_url: z.url().nullable(),
    path: z.url(),
    from: z.number().nullable(),
    to: z.number().nullable(),
  }),
});

export type OrdersData = z.infer<typeof OrdersSchema>;