import {
  checkEmail,
  checkPhone,
  checkUserName,
} from "@/queries/auth/availability.query";
import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>]*$/
);

const signUpStep1 = z.object({
  email: z
    .email({ error: "L'email n'est pas valide" }) // Modifié ici pour Zod v4
    .max(255, { error: "L'email ne doit pas dépasser 255 caractères" }),
  password: z
    .string()
    .min(8, {
      error: "Le mot de passe doit contenir au moins 8 caractères",
    })
    .regex(passwordRegex, {
      error:
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
    }),
  password_confirmation: z
    .string()
    .min(1, { error: "Veuillez confirmer votre mot de passe" }),
});

const signUpStep2 = z.object({
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
    .min(3, { error: "Le nom doit contenir au moins 3 caractères" })
    .max(255, { error: "Le nom doit contenir au plus 255 caractères" }),
  first_name: z
    .string()
    .min(3, { error: "Le prénom doit contenir au moins 3 caractères" })
    .max(255, { error: "Le prénom doit contenir au plus 255 caractères" }),
  sector: z.int(), // Modifié ici pour Zod v4 (z.number().int() -> z.int())
  phone: z
    .string()
    .max(10, { error: "Le numéro ne doit pas dépasser 10 caractères" })
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

const signUp = signUpStep1.extend(signUpStep2.shape);

export const signUpStep1Schema = signUpStep1.superRefine(
  async ({ password, password_confirmation, email }, ctx) => {
    if (!(await checkEmail(email)))
      ctx.addIssue({
        code: "custom",
        message: "L'email est déjà utilisé",
        path: ["email"],
      });

    if (password !== password_confirmation)
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["password_confirmation"],
      });
  }
);

export const signUpStep2Schema = signUpStep2.superRefine(
  async ({ user_name, phone }, ctx) => {
    if (!(await checkUserName(user_name)))
      ctx.addIssue({
        code: "custom",
        message: "Le nom d'utilisateur est déjà utilisé",
        path: ["user_name"],
      });

    if (phone && !(await checkPhone(phone)))
      ctx.addIssue({
        code: "custom",
        message: "Le numéro de téléphone est déjà utilisé",
        path: ["phone"],
      });
  }
);

export const signUpSchema = signUp.superRefine(
  async ({ password, password_confirmation, user_name, phone, email }, ctx) => {
    if (password !== password_confirmation)
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["password_confirmation"],
      });

    if (!(await checkUserName(user_name)))
      ctx.addIssue({
        code: "custom",
        message: "Le nom d'utilisateur est déjà utilisé",
      });

    if (phone && !(await checkPhone(phone)))
      ctx.addIssue({
        code: "custom",
        message: "Le numéro de téléphone est déjà utilisé",
      });

    if (!(await checkEmail(email)))
      ctx.addIssue({
        code: "custom",
        message: "L'email est déjà utilisé",
        path: ["email"],
      });
  }
);

export type SignUpStep1Data = z.infer<typeof signUpStep1>;
export type SignUpStep2Data = z.infer<typeof signUpStep2>;
export type SignUpData = z.infer<typeof signUp>;