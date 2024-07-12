import { z } from "zod";

export const CguSchema = z.object({
  sections: z.array(
    z.object({
      content: z.string(),
      title: z.string(),
    })
  ),
});

export type CguData = z.infer<typeof CguSchema>;
