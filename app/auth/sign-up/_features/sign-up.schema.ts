import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>]*$/
);

const signUpStep1 = z.object({
  email: z.string().min(1, { message: "Un email est requis" }).email({
    message: "L'email n'est pas valide",
  }),
  password: z
    .string()
    .min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    })
    .regex(passwordRegex, {
      message:
        "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre",
    }),
  password_confirmation: z
    .string()
    .min(1, { message: "Veuillez confirmer votre mot de passe" }),
});

const signUpStep2 = z.object({
  user_name: z
    .string()
    .min(3, {
      message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
    })
    .max(30, {
      message: "Le nom d'utilisateur doit contenir au plus 30 caractères",
    }),
  last_name: z
    .string()
    .min(3, { message: "Le nom doit contenir au moins 3 caractères" })
    .max(255, { message: "Le nom doit contenir au plus 255 caractères" }),
  first_name: z
    .string()
    .min(3, { message: "Le prénom doit contenir au moins 3 caractères" })
    .max(255, { message: "Le prénom doit contenir au plus 255 caractères" }),
  sector: z.number().int(),
  phone: z
    .string()
    .regex(phoneRegex, "Le numéro de téléphone n'est pas valide"),
  admission_year: z
    .number()
    .int()
    .min(2000, { message: "L'année de promotion n'est pas valide" })
    .max(3000),
});

const signUp = signUpStep1.merge(signUpStep2);

export const signUpStep1Schema = signUpStep1.superRefine(
  ({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation)
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["password_confirmation"],
      });
  }
);

export const signUpStep2Schema = signUpStep2;

export const signUpSchema = signUp.superRefine(
  ({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation)
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["password_confirmation"],
      });
  }
);

export type SignUpStep1Data = z.infer<typeof signUpStep1>;
export type SignUpStep2Data = z.infer<typeof signUpStep2Schema>;
export type SignUpData = z.infer<typeof signUp>;
