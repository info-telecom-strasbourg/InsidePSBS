import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Le titre doit contenir au moins 3 caractères." })
    .max(255, { error: "Le titre ne peut pas dépasser 255 caractères." }),

  location: z
    .string()
    .min(3, { error: "Le lieu doit contenir au moins 3 caractères." })
    .max(255, { error: "Le lieu ne peut pas dépasser 255 caractères." }),
});

export type CreateEventData = z.infer<typeof CreateEventSchema>;