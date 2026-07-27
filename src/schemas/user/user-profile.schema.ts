import { z } from "zod";

// 1. Profil utilisateur individuel
export const UserProfileSchema = z.object({
  data: z.object({
    id: z.number().int(),
    last_name: z.string(),
    first_name: z.string(),
    user_name: z.string(),
    description: z.string().nullable(),
    avatar_url: z.string().nullable(),
    admission_year: z.number().int(),
    created_at: z.string(),
    updated_at: z.string(),
    sector: z.string(),
    birth_date: z.string().nullable(),
  }),
});

// 2. Associations d'un utilisateur
export const UserOrganizationSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  short_name: z.string().optional(),
  logo_url: z.string().nullable().optional(),
});

export const UserOrganizationsSchema = z.object({
  data: z.array(UserOrganizationSchema),
});

// 3. Liste d'utilisateurs (recherche)
export const UsersSchema = z.object({
  data: z.array(
    z.object({
      id: z.number().int(),
      last_name: z.string(),
      first_name: z.string(),
      user_name: z.string(),
      avatar_url: z.string().nullable(),
      sector: z.string().optional(),
    })
  ),
});

// Types TypeScript exportés
export type UserProfileData = z.infer<typeof UserProfileSchema>;
export type UserOrganizationData = z.infer<typeof UserOrganizationSchema>;
export type UserOrganizationsData = z.infer<typeof UserOrganizationsSchema>;
export type UsersData = z.infer<typeof UsersSchema>;