import axios from "axios";

import API_CROUS from "../../constants/api-crous";

export async function getMenu(name) {
    let URL = `${API_CROUS.url}/${name}`;
  console.log(URL);
  response = await axios.get(URL, { timeout: 5000 });
  console.log(response.data);

  return response.data;
}

export function menuFormatter(menu) {
  let dish = [];

  for (let i = 0; i < menu.length; i++) {
    var date = menu[i]["date"];

    if (!dish[date]) {
      dish[date] = {};
    }

    // Check if the menu is not empty
    if (
            menu[i]["Déjeuner"]["ENTREES"] &&
      menu[i]["Déjeuner"]["ENTREES"].length === 0
        ) {
      dish[date].starter = "Pas de menu disponible pour aujourd'hui !";
      dish[date].main = "Pas de menu disponible pour aujourd'hui !";
      dish[date].pasta = "Pas de menu disponible pour aujourd'hui !";
      dish[date].veg = "Pas de menu disponible pour aujourd'hui !";
      dish[date].grill = "Pas de menu disponible pour aujourd'hui !";
      dish[date].dessert = "Pas de menu disponible pour aujourd'hui !";
        } else if (menu[i]["Déjeuner"]["ENTREES"]) {
      dish[date].starter = menu[i]["Déjeuner"]["ENTREES"].join("\n");
      dish[date].main = menu[i]["Déjeuner"]["MENU DU JOUR"].join("\n");
      dish[date].pasta = menu[i]["Déjeuner"]["POLE PATES"].join("\n");
      dish[date].veg = menu[i]["Déjeuner"]["MENU VEGETARIEN"].join("\n");
      dish[date].grill = menu[i]["Déjeuner"]["GRILL"].join("\n");
      dish[date].dessert = menu[i]["Déjeuner"]["DESSERTS"].join("\n");
    }
  }

  return dish;
}
