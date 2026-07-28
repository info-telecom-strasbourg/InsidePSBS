import { z } from "zod";

const OrganizationIndexSchema = z.object({
  id: z.number().int(),
  short_name: z.string().nullable(),
  name: z.string(),
  logo_url: z.url().nullable(),
});

// Define the schema for the API response
export const OrganizationSchema = z.object({
  data: z.object({
    associations: z.array(OrganizationIndexSchema),
    clubs: z.array(OrganizationIndexSchema),
  }),
});

export type OrganizationData = z.infer<typeof OrganizationSchema>;