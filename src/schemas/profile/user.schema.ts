import { z } from "zod";

export const LoginUserSchema = z.object({
  id: z.number(),
  user_name: z.string(),
  last_name: z.string(),
  first_name: z.string(),
  sector_id: z.number(),
  email: z.string().email(),
  phone: z.string().nullable(),
  promotion_year: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

const UserSchema = z.object({
  id: z.number(),
  last_name: z.string(),
  first_name: z.string(),
  user_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  bde_id: z.number(),
  avatar_url: z.string().url(),
  promotion_year: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  email_verified_at: z.string(),
  sector: z.string(),
  birth_date: z.string().nullable(),
});

const AuthorSchema = z.object({
  id: z.number(),
  last_name: z.string(),
  first_name: z.string(),
  user_name: z.string(),
  email: z.string().email(),
});

const MediaSchema = z.object({
  id: z.number(),
  url: z.string().url(),
  type: z.string(),
  post_id: z.number(),
});

const MetaSchema = z.object({
  total: z.number(),
  per_page: z.number(),
  current_page: z.number(),
  last_page: z.number(),
  first_page_url: z.string().url(),
  last_page_url: z.string().url(),
  next_page_url: z.string(),
  prev_page_url: z.string(),
  path: z.string().url(),
  from: z.number().nullable(),
  to: z.number().nullable(),
});

const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  user_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
  media: z.array(MediaSchema),
  author: AuthorSchema,
});

const PostsSchema = z.object({
  data: z.array(PostSchema), // Since there are no posts in the example, using z.unknown()
  meta: MetaSchema,
});

export const ItsMeUserSchema = z.object({
  data: UserSchema,
  posts: PostsSchema,
});

export type LoginUser = z.infer<typeof LoginUserSchema>;

export type ItsMeUserData = z.infer<typeof ItsMeUserSchema>;
