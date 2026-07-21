import {
  checkEmail,
  checkPhone,
  checkUserName,
} from "@/queries/auth/availability.query";
import { z } from "zod";

// Regex téléphone internationale / FR révisée
const phoneRegex = new RegExp(/^(\+33|0)[1-9](\s?\d{2}){4}$/);

const signUpStep1Base = z.object({
  email: z
    .email({ error: "L'email n'est pas valide" })
    .max(255, { error: "L'email ne doit pas dépasser 255 caractères" }),
  password: z
    .string()
    .min(15, {
      error: "Le mot de passe doit contenir au moins 15 caractères",
    }),
  password_confirmation: z
    .string()
    .min(1, { error: "Veuillez confirmer votre mot de passe" }),
});

const signUpStep2Base = z.object({
  user_name: z
    .string()
    .min(3, {
      error: "Le nom d'utilisateur doit contenir au moins 3 caractères",
    })
    .max(30, {
      error: "Le nom d'utilisateur doit contenir au plus 30 caractères",
    }),
  last_name: z
    .string()
    .min(1, { error: "Le nom ne peut pas être vide" })
    .max(255, { error: "Le nom doit contenir au plus 255 caractères" }),
  first_name: z
    .string()
    .min(1, { error: "Le prénom ne peut pas être vide" })
    .max(255, { error: "Le prénom doit contenir au plus 255 caractères" }),
  sector: z.int(),
  phone: z
    .string()
    .max(14, { error: "Le numéro ne doit pas dépasser 14 caractères" })
    .regex(phoneRegex, { error: "Le numéro de téléphone n'est pas valide" })
    .optional(),
  admission_year: z
    .string()
    .regex(/\d+/, { error: "L'année de promotion n'est pas valide" })
    .transform(Number)
    .refine((n) => n >= 2000 && n <= 3000, {
      error: "L'année de promotion n'est pas valide",
    }),
  birth_date: z.string().date().optional(),
});

// 1. Déclaration des schémas validés avec superRefine
export const signUpStep1Schema = signUpStep1Base.superRefine(
  async ({ password, password_confirmation, email }, ctx) => {
    if (password !== password_confirmation) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["password_confirmation"],
      });
    }

    if (!(await checkEmail(email))) {
      ctx.addIssue({
        code: "custom",
        message: "L'email est déjà utilisé",
        path: ["email"],
      });
    }
  }
);

export const signUpStep2Schema = signUpStep2Base.superRefine(
  async ({ user_name, phone }, ctx) => {
    if (!(await checkUserName(user_name))) {
      ctx.addIssue({
        code: "custom",
        message: "Le nom d'utilisateur est déjà utilisé",
        path: ["user_name"],
      });
    }

    if (phone && !(await checkPhone(phone))) {
      ctx.addIssue({
        code: "custom",
        message: "Le numéro de téléphone est déjà utilisé",
        path: ["phone"],
      });
    }
  }
);

// 2. Fusion des schémas validés (pour l'étape finale ou validation globale)
export const signUpSchema = z.intersection(
  signUpStep1Schema,
  signUpStep2Schema
);

// 3. Types inférés
export type SignUpStep1Data = z.infer<typeof signUpStep1Base>;
export type SignUpStep2Data = z.infer<typeof signUpStep2Base>;
export type SignUpData = z.infer<typeof signUpSchema>;