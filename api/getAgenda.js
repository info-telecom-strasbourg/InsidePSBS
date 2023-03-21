import Config from "react-native-config";
/**
 * fonction asynchrone qui permet d'aller chercher l'ICS de agenda 
 * sur le serveur puis le retourne une fois qu'il est chargé
 * @returns {string} string contenant l'ICS
 */
export async function getAgenda() {

  try {
    let response = await fetch(Config.Global_ICS_URL);
    let data = await response.text();

    return data;
  } catch (error) {
    console.error(error);
  }
  return data;
}