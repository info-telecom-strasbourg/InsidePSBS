import { BackendURL } from "env";
/**
 * fonction qui va sur le site de connexion et récupère les données de l'utilisateur
 * (une fois que l'utilisateur s'est connecté depuis la webview)
 * @param {*} props 
 * @param {*} navigation 
 */
export async function getAuth(props,navigation) {
    if (props.loading==false && props.url==(BackendURL+'app-login')){
    try {
      let response = await fetch((BackendURL+'app-login'));
      let data = await response.json();
      return data
    } catch (error) {
      console.error(error);
    }
  }
  }
