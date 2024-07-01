import { z } from "zod";

export const OrdersSchema = z.object({
  data: z.object({
    orders: z.array(
      z.object({
        date: z.string(),
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
    per_page: z.number(),
    current_page: z.number(),
    last_page: z.number(),
    first_page_url: z.string().url(),
    last_page_url: z.string().url(),
    next_page_url: z.string(),
    prev_page_url: z.string(),
    path: z.string().url(),
    from: z.number().nullable(),
    to: z.number().nullable(),
  }),
});

export type OrdersData = z.infer<typeof OrdersSchema>;
