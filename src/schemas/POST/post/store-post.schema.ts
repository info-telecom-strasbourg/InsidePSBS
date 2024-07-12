import { z } from "zod";

export const PostBodySchema = z.object({
  type: z.string(),
  content: z.array(
    // Chaque élément du tableau est un objet qui représente une ligne de l'input
    z.object({
      type: z.string(),
      content: z.array(
        z.object({
          type: z.string(),
          marks: z.array(z.object({ type: z.string() })).optional(),
          text: z.string(),
        })
      ),
    }) || z.object({ type: z.string(), attrs: z.object({ level: z.number() }) })
  ),
});

export const StorePostSchema = z.object({
  create_post: z.number(),
  body: z.string(),
  organization_id: z.number().nullable(),
  uploaded_at: z.string().nullable(),
});

export type StorePostData = z.infer<typeof StorePostSchema>;
export type PostBodyData = z.infer<typeof PostBodySchema>;
