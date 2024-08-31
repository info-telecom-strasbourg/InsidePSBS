import { z } from "zod";

export const SectorsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    short_name: z.string(),
  })
);

export type SectorsData = z.infer<typeof SectorsSchema>;
