import { z } from "zod";

const OrganizationIndexSchema = z.object({
  id: z.number(),
  short_name: z.string().nullable(),
  name: z.string(),
  logo_url: z.string().url(),
});

// Define the schema for the API response
export const OrganizationSchema = z.object({
  data: z.object({
    associations: z.array(OrganizationIndexSchema),
    clubs: z.array(OrganizationIndexSchema),
  }),
});

export type OrganizationData = z.infer<typeof OrganizationSchema>;
