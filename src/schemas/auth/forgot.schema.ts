import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.email({ error: "L'email n'est pas valide" }),
});

export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;
