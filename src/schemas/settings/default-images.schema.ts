import { z } from "zod";

export const DefaultImagesSchema = z.object({
  data: z.array(z.object({ name: z.string(), path: z.string() })),
});

export const StoreDefaultImageSchema = z.object({
  default_link: z.string(),
  default_name: z.string(),
});

export type DefaultImagesData = z.infer<typeof DefaultImagesSchema>;
export type StoreDefaultImageData = z.infer<typeof StoreDefaultImageSchema>;
