import { z } from "zod";

const organizationSchema = z.object({
  short_name: z.string().nullable(),
  name: z.string(),
  description: z.string(),
  website_link: z.string().url().nullable(),
  facebook_link: z.string().url().nullable(),
  twitter_link: z.string().url().nullable(),
  instagram_link: z.string().url().nullable(),
  discord_link: z.string().url().nullable(),
  email: z.string().email().nullable(),
  logo_url: z.string().url().nullable(),
});

const memberSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  avatar_url: z.string().url().nullable(),
});

export const ShowOrganization = z.object({
  organization: organizationSchema,
  members: z.array(memberSchema),
});

export type ShowOrganizationData = z.infer<typeof ShowOrganization>;
