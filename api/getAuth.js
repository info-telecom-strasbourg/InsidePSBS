/**
 * fonction qui va sur le site de connexion et récupère les données de l'utilisateur
 * (une fois que l'utilisateur s'est connecté depuis la webview)
 * @param {*} props 
 * @param {*} navigation 
 */
async function getAuth(props,navigation) {
    if (props.loading==false && props.url=='https://app.its-tps.fr/app-login'){
    try {
      let response = await fetch('https://app.its-tps.fr/app-login');
      let data = await response.json();
      await login(data);
      navigation.navigate("Tabs");
    } catch (error) {
      console.error(error);
    }
  }
  }
export default getAuth;