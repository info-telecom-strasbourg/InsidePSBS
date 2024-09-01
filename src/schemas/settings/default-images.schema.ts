import { z } from "zod";

export const DefaultImagesSchema = z.array(z.string());

export type DefaultImagesData = z.infer<typeof DefaultImagesSchema>;
