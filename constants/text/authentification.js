const authentification = {
  email: "Email *",
  password: "Mot de passe *",
  password_confirmation: "Confirmer le mot de passe *",
  forgot_password: "Mot de passe oublié ?",
  first_name: "Prénom *",
  last_name: "Nom *",
  user_name: "Nom d'utilisateur *",
  phone: "Numéro de téléphone *",
  promotion_year: "Promotion",
  sector: "Filière",
  sectors: {
    empty: "Non renseigné",
    ir: "IR",
    ti: "TI",
    gene: "Géné",
    fip: "FIP",
    bs: "BS",
  },
  placeholders: {
    email: "louis.royet@me.com",
    password: "********",
    first_name: "Louis",
    last_name: "Royet",
    user_name: "louis.royet",
    phone: "0666723073",
    promotion_year: "2059",
  },

  register: {
    title: "S'inscrire",
    register_with_google: "Continuer avec Google",
    register_with_facebook: "Continuer avec Facebook.tsx",
    register_with_apple: "Continuer avec Apple",
    register_with_unistra: "Continuer avec Unistra",
    link_with_unistra: "Lier son compte Unistra",
    submit: "Créer un compte",
    next: "Suivant",
    skip: "Passer cette étape",
    already_registered: "Déjà un compte ?",
    personal_informaions: "Informations personnelles",
    unistra_account: "Compte Unistra",
    accept_cgu: "Accepter les conditions d'utilisation",
    cgu: "Conditions d'utilisation",
  },
  login: {
    title: "Se connecter",
    login_with_google: "Se connecter avec Google",
    login_with_facebook: "Se connecter avec Facebook.tsx",
    login_with_apple: "Se connecter avec Apple",
    login_with_unistra: "Se connecter avec Unistra",
    submit: "Se connecter",
    not_registered: "Pas encore de compte ?",
  },

  errors: {
    empty: "Ce champ ne peut pas être vide",
    email: "L'email est invalide",
    password:
      "Le mot de passe doit contenir au moins 8 caractères et au moins une majuscule, une minuscule et un chiffre",
    password_confirmation: "Les mots de passe ne correspondent pas",
    user_name:
      "Le nom d'utilisateur doit contenir au moins 3 caractères (a-z A-Z 0-9 .-_)",
    phone: "Le numéro de téléphone est invalide",
    cgu: "Vous devez accepter les conditions d'utilisation",
  },
};

export default authentification;
