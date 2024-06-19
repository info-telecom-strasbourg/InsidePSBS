import { z } from "zod";

export const OneAssoSchema = z.object({
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

export type OneAssoData = z.infer<typeof OneAssoSchema>;
