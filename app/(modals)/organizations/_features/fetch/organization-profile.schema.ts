import { z } from "zod";

const organizationSchema = z.object({
  short_name: z.string(),
  name: z.string(),
  description: z.string(),
  website_link: z.string().url(),
  facebook_link: z.string().url(),
  twitter_link: z.string().url(),
  instagram_link: z.string().url(),
  discord_link: z.string().url(),
  email: z.string().email(),
  logo_url: z.string().url(),
});

const memberSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  avatar_url: z.string().url(),
});

export const ShowOrganization = z.object({
  organization: organizationSchema,
  members: z.array(memberSchema),
});

export type ShowOrganizationData = z.infer<typeof ShowOrganization>;
