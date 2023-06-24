import axios from 'axios';

function EN_to_FR(month) {
    // Convert the english month to french month
    var months = {
      January: "janvier",
      February: "février",
      March: "mars",
      April: "avril",
      May: "mai",
      June: "juin",
      July: "juillet",
      August: "août",
      September: "septembre",
      October: "octobre",
      November: "novembre",
      December: "décembre",
    };
  
    return months[month];
  }


export async function getMenuIllkirch() {
    var URL = "https://www.crous-strasbourg.fr/restaurant/resto-u-illkirch/";
    var response = await axios.get(URL);
    var buffer = response.data;
    var date = new Date();
    date.setDate(date.getDate() - 2);
    var day = date.getDate().toString();
    if (day[0] === "0") {
        day = day[1];
    }
    var hour = date.getHours();
    var day_int = hour >= 14 ? parseInt(day) + 1 : parseInt(day);

    var date = day_int + " " + month;

    var month = EN_to_FR(date.toLocaleString("default", { month: "long" }));

    let menu = buffer.indexOf(date);
    buffer = buffer.substring(menu);

    // Get the menu of the lunch
    menu = buffer.indexOf("Déjeuner");
    buffer = buffer.substring(menu + 45);

    // Get the end of the menu
    let end = buffer.indexOf("SALLE DES PERSONNELS");
    buffer = buffer.substring(0, end);

    // Remove the HTML tags
    buffer = buffer.replace(/<\/li>/g, "\n");
    buffer = buffer.replace(/<li>/g, "");
    buffer = buffer.replace(/<\/ul>/g, "\n");
    buffer = buffer.replace(/<ul>/g, "\n");

    // Get only the menu concerning the students only
    buffer = buffer.split("SALLE");
    let str = "";
    for (let i = 0; i < buffer.length; i++) {
    if (buffer[i].includes("ETUDIANTS")) {
        str += "SALLE" + buffer[i];
    }
    }

    // Remove the ":" in a room content
    if (str.includes("chaude : ")) {
    str = str.replace("chaude : ", "chaude -> ");
    }

    // Check if the menu is empty
    if (str === "") {
    str = "Pas de menu disponible pour aujourd'hui !";
    }
    console.log(str);
    return str;
}



