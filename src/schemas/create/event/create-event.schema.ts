import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string().min(1, { message: "Le titre est obligatoire." }),
  place: z.string().min(1, { message: "Le lieu est obligatoire." }),
});

export type CreateEventData = z.infer<typeof CreateEventSchema>;
