import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "L'email n'est pas valide" }),
});

export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;
