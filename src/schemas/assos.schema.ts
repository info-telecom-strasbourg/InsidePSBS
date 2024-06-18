import { z } from "zod";

const organizationSchema = z.object({
  id: z.number(),
  logo_url: z.string().url(),
  name: z.string(),
  short_name: z.string().nullable(),
});

// Define the schema for the API response
export const AssosSchema = z.object({
  associations: z.array(organizationSchema),
  clubs: z.array(organizationSchema),
});

export type AssosData = z.infer<typeof AssosSchema>;
