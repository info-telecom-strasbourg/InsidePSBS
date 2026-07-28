import { z } from "zod";

// Schéma pour ajouter une réaction (POST)
export const AddReactionOnPostSchema = z.object({
  reaction_type_id: z.number().int(),
  post_comment_id: z.number().int().optional(),
});

// Schéma pour les types de réactions disponibles
export const ReactionTypeSchema = z.object({
  data: z.array(
    z.object({
      id: z.number().int(),
      name: z.string(),
      icon: z.string(),
    })
  ),
});

// 🟢 NOUVEAU : Schéma pour la liste des réactions sur un post (GET)
export const ReactionsSchema = z.object({
  data: z.array(
    z.object({
      id: z.number().int(),
      reaction_type_id: z.number().int(),
      user_id: z.number().int(),
      post_id: z.number().int().optional(),
    })
  ),
});

// Exportation des types TypeScript dérivés
export type AddReactionOnPostData = z.infer<typeof AddReactionOnPostSchema>;
export type ReactionTypeData = z.infer<typeof ReactionTypeSchema>;
export type ReactionsData = z.infer<typeof ReactionsSchema>;