import axios from "axios";

import API_CROUS from "../../constants/api-crous";

export function getDate(day_diff) {
  // Get the date of the day
  var date = new Date();
  date.setDate(date.getDate() + day_diff);
  var day = date.getDate().toString();
  if (day[0] === "0") {
    day = day[1];
  }
  var month = date.toLocaleString("fr-FR", { month: "long" });
  var date = parseInt(day) + " " + month;

  return date;
}

export async function getMenu(name) {
  var URL = `${API_CROUS.url}/${name}`;
  response = await axios.get(URL);

  return response.data;


  // const formatedDate = `${date.getDate()} ${date.toLocaleString("fr-FR", {
  //   month: "long",
  // })}`;

  // let menu = buffer.indexOf(formatedDate);

  // buffer = buffer.substring(menu);

  // // Get the menu of the lunch
  // menu = buffer.indexOf(formatedDate);
  // if (menu === -1) {
  //   return -1;
  // }
  // menu += 45;
  // buffer = buffer.substring(menu);

  // // Get the end of the menu
  // let end = buffer.indexOf("SALLE DES PERSONNELS");

  // buffer = buffer.substring(0, end);

  // // Remove the HTML tags
  // buffer = buffer.replace(/<\/li>/g, "\n");
  // buffer = buffer.replace(/<li>/g, "");
  // buffer = buffer.replace(/<\/ul>/g, "\n");
  // buffer = buffer.replace(/<ul>/g, "\n");

  // // Get only the menu concerning the students only
  // buffer = buffer.split("SALLE");
  // let str = "";
  // for (let i = 0; i < buffer.length; i++) {
  //   if (buffer[i].includes("ETUDIANTS")) {
  //     str += "SALLE" + buffer[i];
  //   }
  // }

  // // Remove the ":" in a room content
  // if (str.includes("chaude : ")) {
  //   str = str.replace("chaude : ", "chaude -> ");
  // }

  // // Check if the menu is empty
  // if (str === "") {
  //   str = "Pas de menu disponible pour aujourd'hui !";
  // }
  // return str;
}

export function menuFormatter(menu) {
  let dish = [];

  for (let i = 0; i < menu.length; i++) {
    var date = menu[i]["date"];

    if (!dish[date]) {
      dish[date] = {};
    }

    // Check if the menu is not empty
    if (menu[i]["Déjeuner"]["ENTREES"] && menu[i]["Déjeuner"]["ENTREES"].length === 0) {
      dish[date].starter = "Pas de menu disponible pour aujourd'hui !";
      dish[date].main = "Pas de menu disponible pour aujourd'hui !";
      dish[date].pasta = "Pas de menu disponible pour aujourd'hui !";
      dish[date].veg = "Pas de menu disponible pour aujourd'hui !";
      dish[date].grill = "Pas de menu disponible pour aujourd'hui !";
      dish[date].dessert = "Pas de menu disponible pour aujourd'hui !";

    }
    else if (menu[i]["Déjeuner"]["ENTREES"]) {
      dish[date].starter = menu[i]["Déjeuner"]["ENTREES"].join("\n");
      dish[date].main = menu[i]["Déjeuner"]["MENU DU JOUR"].join("\n");
      dish[date].pasta = menu[i]["Déjeuner"]["POLE PATES"].join("\n");
      dish[date].veg = menu[i]["Déjeuner"]["MENU VEGETARIEN"].join("\n");
      dish[date].grill = menu[i]["Déjeuner"]["GRILL"].join("\n");
      dish[date].dessert = menu[i]["Déjeuner"]["DESSERTS"].join("\n");
    }
  }

  return dish;

  // let starindex =
  //   menu.indexOf("SALLE DES ETUDIANTS - ENTREES") +
  //   "SALLE DES ETUDIANTS - ENTREES".length;
  // let endindex = menu.indexOf("\n\nSALLE DES ETUDIANTS - MENU DU JOUR");
  // let starter = menu.substring(starindex, endindex);

  // dish.starter = starter;
  // starindex =
  //   menu.indexOf("SALLE DES ETUDIANTS - MENU DU JOUR") +
  //   "SALLE DES ETUDIANTS - MENU DU JOUR".length;
  // endindex = menu.indexOf("\n\nSALLE DES ETUDIANTS - POLE PATES");
  // let main = menu.substring(starindex, endindex);
  // dish.main = "   " + main;
  // starindex =
  //   menu.indexOf("SALLE DES ETUDIANTS - POLE PATES") +
  //   "SALLE DES ETUDIANTS - POLE PATES".length;
  // endindex = menu.indexOf("\n\nSALLE DES ETUDIANTS - MENU VEGETARIEN");
  // let pasta = menu.substring(starindex, endindex);
  // dish.pasta = "   " + pasta;
  // starindex =
  //   menu.indexOf("SALLE DES ETUDIANTS - MENU VEGETARIEN") +
  //   "SALLE DES ETUDIANTS - MENU VEGETARIEN".length;
  // endindex = menu.indexOf("\n\nSALLE DES ETUDIANTS - DESSERTS");
  // let veg = menu.substring(starindex, endindex);
  // dish.veg = "   " + veg;
  // starindex =
  //   menu.indexOf("SALLE DES ETUDIANTS - DESSERTS") +
  //   "SALLE DES ETUDIANTS - DESSERTS".length;
  // endindex = menu.indexOf("\n\nSALLE DES ETUDIANTS - GRILL");
  // let dessert = menu.substring(starindex, endindex);
  // dish.dessert = "   " + dessert;
  // starindex =
  //   menu.indexOf("SALLE DES ETUDIANTS - GRILL") +
  //   "SALLE DES ETUDIANTS - GRILL".length;
  // endindex = menu.length - 2; //to delete the 2 last \n
  // let grill = menu.substring(starindex, endindex);
  // dish.grill = "   " + grill;
  // return dish;
}
