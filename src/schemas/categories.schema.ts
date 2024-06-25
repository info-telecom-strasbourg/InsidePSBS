import { z } from "zod";

export const CategoriesSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});
