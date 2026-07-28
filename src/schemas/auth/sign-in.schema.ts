import { z } from "zod";

export const SignInSchema = z.object({
  email: z.email({ error: "Veuillez entrer une adresse email valide" }),
  password: z.string().min(1, { error: "Veuillez entrer un mot de passe" }),
});

export type SignInData = z.infer<typeof SignInSchema>;