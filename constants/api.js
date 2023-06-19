const API = {
  url: "https://app-pprd.its-tps.fr/api",
  fouaille: "/fouaille", // token pour GET la page fouaille de l'user
  login: "/login", // POST pour se connecter
  register: "/register", // POST pour s'inscrire
  user: "/user", // GET pour récupérer les infos de l'user et PUT pour modifier les infos
};

export default API;
