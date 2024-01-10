import { ZodError } from "zod";

interface Error {
  status?: number;
}

export const handleForgotPasswordError = (error: Error): string => {
  if (error instanceof ZodError) {
    return "L'adresse email renseignée est incorrect";
  }

  switch (error.status) {
    case 404:
      return "L'adresse email renseignée n'a pas de compte";

    default:
      console.error(error);
      return "Une erreur est survenue. Veuillez réessayer plus tard. Si le problème persiste, contactez un administrateur.";
  }
};
