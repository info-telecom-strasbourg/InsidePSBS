import { verifyEmail } from "queries/auth/verify-email";

import { errorToast } from "./toast";

export const handle_login_error = async (error) => {
  const errorMessage = await error.json();
  switch (error.status) {
    case 401:
      errorToast("Email ou mot de passe incorrect.");
      console.error(errorMessage);
      break;
    case 409:
      errorToast("Votre compte n'a pas été validé. Un mail a été renvoyé.");
      console.error(errorMessage);
      await verifyEmail(errorMessage.token);
      break;

    default:
      errorToast("Une erreur est survenue.");
      console.log(error.status);
      console.error(errorMessage);
  }
};
