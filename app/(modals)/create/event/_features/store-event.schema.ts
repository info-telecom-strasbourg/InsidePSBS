import { z } from "zod";

export const StoreEventSchema = z.object({
  create_event: z.number(),
  title: z.string(),
  location: z.string(),
  organization_id: z.number().nullable(),
  start_at: z.string(),
  end_at: z.string(),
});

export type StoreEventData = z.infer<typeof StoreEventSchema>;
