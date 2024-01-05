import { ZodError } from "zod";

interface Error {
  status?: number;
}

export const handleLoginError = (error: Error): string => {
  if (error instanceof ZodError) {
    return "L'adresse email ou le mot de passe est incorrect";
  }

  switch (error.status) {
    case 401:
      return "L'adresse email ou le mot de passe est incorrect";

    case 429:
      return "Trop de tentatives de connexion. Veuillez réessayer ultérieurement";

    default:
      console.error(error);
      return "Une erreur est survenue. Veuillez réessayer plus tard. Si le problème persiste, contactez un administrateur.";
  }
};
