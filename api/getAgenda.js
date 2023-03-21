import {Global_ICS_URL} from "@env"/**
 * fonction asynchrone qui permet d'aller chercher l'ICS de agenda 
 * sur le serveur puis le retourne une fois qu'il est chargé
 * @returns {string} string contenant l'ICS
 */
export async function getAgenda() {

  try {
    console.log("getAgenda",Global_ICS_URL);
    let response = await fetch(Global_ICS_URL);
    let data = await response.text();

    return data;
  } catch (error) {
    console.error(error);
  }
  return data;
}