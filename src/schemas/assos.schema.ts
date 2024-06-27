import { z } from "zod";
import { AuthorSchema } from "./author.schema";

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

const OrganizationItemSchema = z.object({
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

const postSchema = z.object({
  id: z.number(),
  body: z.string(),
  created_since: z.string(),
  color: z.string(),
  category: z.string(),
  reaction_count: z.number(),
  comment_count: z.number(),
  medias: z.array(z.any()), // Assuming medias can be any type
  author: AuthorSchema,
});

const postsDataSchema = z.object({
  data: z.array(postSchema),
  meta: z.object({
    total: z.number(),
    per_page: z.number(),
    current_page: z.number(),
    last_page: z.number(),
    first_page_url: z.string().url(),
    last_page_url: z.string().url(),
    next_page_url: z.string().nullable(),
    prev_page_url: z.string().nullable(),
    path: z.string().url(),
    from: z.number(),
    to: z.number(),
    in_page: z.number(),
  }),
});

export const ShowOrganizationItemSchema = z.object({
  organization: OrganizationItemSchema,
  members: z.array(memberSchema),
  posts: postsDataSchema,
});

export type OrganizationData = z.infer<typeof OrganizationSchema>;

export type ShowOrganizationItemData = z.infer<
  typeof ShowOrganizationItemSchema
>;
