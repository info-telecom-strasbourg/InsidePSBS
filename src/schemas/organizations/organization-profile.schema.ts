import { z } from "zod";

const organizationSchema = z.object({
  short_name: z.string().nullable(),
  name: z.string(),
  description: z.string().nullable(),
  website_link: z.string().nullable(),
  facebook_link: z.string().nullable(),
  twitter_link: z.string().nullable(),
  instagram_link: z.string().nullable(),
  discord_link: z.string().nullable(),
  email: z.email().nullable(),               
  logo_url: z.url().nullable(),               
});

const memberSchema = z.object({
  id: z.number().int(),
  first_name: z.string(),
  last_name: z.string(),
  avatar_url: z.url().nullable(),           
});

export const ShowOrganization = z.object({
  organization: organizationSchema,
  members: z.array(memberSchema),
});

export type ShowOrganizationData = z.infer<typeof ShowOrganization>;