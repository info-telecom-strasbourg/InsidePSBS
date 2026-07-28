import { z } from "zod";

const TextMarkSchema = z.object({
  type: z.string(),
});

const TextNodeSchema = z.object({
  type: z.string(),
  marks: z.array(TextMarkSchema).optional(),
  text: z.string(),
});

const ContentNodeSchema = z.object({
  type: z.string(),
  content: z.array(TextNodeSchema),
  attrs: z
    .object({
      level: z.int(),
    })
    .optional(),
});

export const PostBodySchema = z.object({
  type: z.string(),
  content: z.array(ContentNodeSchema),
});

export const StorePostSchema = z.object({
  create_post: z.enum(["0", "1"]),

  body: z
    .string()
    .min(3, { error: "Le contenu du post doit contenir au moins 3 caractères." }),

  organization_id: z.int().optional(),

  uploaded_at: z.string().optional(),
});

export const StorePostCategoriesSchema = z.object({
  post_id: z.int().optional(),

  event_id: z.int().optional(),

  category_ids: z.array(z.string()),
});

export const StorePostResponseSchema = z.object({
  message: z.string(),

  data: z.object({
    body: z.string(),

    organization_id: z.int().nullable().optional(),

    user_id: z.int(),

    updated_at: z.string(),

    created_at: z.string(),

    id: z.int(),
  }),
});

export type StorePostData = z.infer<typeof StorePostSchema>;
export type PostBodyData = z.infer<typeof PostBodySchema>;
export type StorePostCategoriesData = z.infer<typeof StorePostCategoriesSchema>;
export type StorePostResponseData = z.infer<typeof StorePostResponseSchema>;