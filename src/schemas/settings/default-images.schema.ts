import { z } from "zod";

export const DefaultImagesSchema = z.object({
  data: z.array(z.object({ name: z.string(), path: z.string() })),
});

export type DefaultImagesData = z.infer<typeof DefaultImagesSchema>;
