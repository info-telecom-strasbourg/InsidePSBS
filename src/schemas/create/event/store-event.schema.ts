import { z } from "zod";

export const StoreEventSchema = z.object({
  create_event: z.enum(["0", "1"]),

  title: z
    .string()
    .min(3, { error: "Le titre doit contenir au moins 3 caractères." })
    .max(255, { error: "Le titre ne peut pas dépasser 255 caractères." }),

  location: z
    .string()
    .min(3, { error: "Le lieu doit contenir au moins 3 caractères." })
    .max(255, { error: "Le lieu ne peut pas dépasser 255 caractères." })
    .optional(),

  organization_id: z.int().optional(),

  start_at: z.string().optional(),

  end_at: z.string().optional(),

  uploaded_at: z.string().optional(),
});

export type StoreEventData = z.infer<typeof StoreEventSchema>;