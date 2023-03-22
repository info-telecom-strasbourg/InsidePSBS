import {Global_ICS_URL} from 'react-native-dotenv'
/**
 * fonction asynchrone qui permet d'aller chercher l'ICS de agenda 
 * sur le serveur puis le retourne une fois qu'il est chargé
 * @returns {string} string contenant l'ICS
 */
export async function getAgenda() {

  try {
    console.log("envoie de la requête pour mise à jour de l'agenda");
    let response = await fetch(Global_ICS_URL);
    let data = await response.text();
    console.log("réponse reçue pour mise à jour de l'agenda");

    return data;
  } catch (error) {
    console.error(error);
  }
  return data;
}