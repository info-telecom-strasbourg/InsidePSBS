import { z } from "zod";

export const CategoriesSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      color: z.string(),
      emoji: z.string(),
    })
  ),
});

export type CategoriesData = z.infer<typeof CategoriesSchema>;
