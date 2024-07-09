import { z } from "zod";
import { AuthorSchema } from "../author.schema";
import { MetaSchema } from "../meta.schema";

const schema = z.object({
  id: z.number(),
  post_id: z.number().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  start_at: z.string(),
  end_at: z.string(),
  location: z.string(),
  color: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  author: AuthorSchema,
});

export const EventSchema = z.object({
  data: z.array(schema),
  meta: MetaSchema,
});

export type EventsData = z.infer<typeof EventSchema>;
