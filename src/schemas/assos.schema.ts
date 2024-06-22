import { z } from "zod";

const organizationSchema = z.object({
  id: z.number(),
  logo_url: z.string().url(),
  name: z.string(),
  short_name: z.string().nullable(),
});

// Define the schema for the API response
export const AssociationSchema = z.object({
  associations: z.array(organizationSchema),
  clubs: z.array(organizationSchema),
});

export const AssociationItemSchema = z.object({
  description: z.string().nullable(),
  discord_link: z.string().url().nullable(),
  email: z.string().email().nullable(),
  facebook_link: z.string().url().nullable(),
  instagram_link: z.string().url().nullable(),
  logo_url: z.string().url().nullable(),
  name: z.string().nullable(),
  short_name: z.string().nullable(),
  twitter_link: z.string().url().nullable(),
  website_link: z.string().url().nullable(),
});

export type AssociationItem = z.infer<typeof AssociationItemSchema>;

export type Association = z.infer<typeof AssociationSchema>;
