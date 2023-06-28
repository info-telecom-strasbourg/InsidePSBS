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
    email: "C'est pas un email ça !",
    password:
      "Le mot de passe doit contenir au moins 8 caractères et au moins une majuscule, une minuscule et un chiffre (c'est un peu technique)",
    password_confirmation: "C'est pas ce que tu m'as dit avant...",
    former_password:
      "Ce n'est pas le bon mot de passe, n'essaie pas de me hacker chenapan(e)",
    user_name:
      "Le nom d'utilisateur doit contenir au moins 3 caractères (a-z A-Z 0-9 .-_)",
    phone: "Ce numéro n'est pas attribué par l'ARCEP",
    promotion_year:
      "Même si tu redoubles plus de fois que Louis, tu seras diplômé avant",
    cgu: "Vous devez accepter les conditions d'utilisation",
    email_already_used: "Oups... Cet email est déjà utilisé",
    user_name_already_used: "Quelqu'un a déjà ce joli nom",
  },
};

export default authentification;
