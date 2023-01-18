import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
var deburr = require('lodash.deburr');

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

async function login(data){
  displayName=data["displayName"];
  displayName="tifaine Delaubier";
  prenom=displayName.substring(0,displayName.indexOf(" "));
  nom=displayName.substring(displayName.indexOf(" ")+1);
  console.log(nom);
  nom=nom.toLowerCase();
  prenom=prenom.toLowerCase();
  nom=deburr( nom, );
  prenom=deburr( prenom, );
  await AsyncStorage.setItem('nom',nom);
  await AsyncStorage.setItem('prenom',prenom);
  await AsyncStorage.setItem('logged',"true" );
  await AsyncStorage.setItem('displayName',data["displayName"]);
  await AsyncStorage.setItem('mail',data["mail"]);
  await AsyncStorage.setItem('udsDisplayName',data["udsDisplayName"]);
}
function ConnexionPage() {
  const navigation = useNavigation();

  return (
    <WebView
      source={{ uri: 'https://app.its-tps.fr/app-login' }}
      style={{ marginTop: 20 }}
      onNavigationStateChange={(props) => {
        getAuth(props,navigation);
        }}
    />
    //possible de garder auth à l'aide de ; basicAuthCredentials: { username: 'user', password: 'pass' }
  );
      };

function Connexion() {
  const [shouldHide, setShouldHide] = React.useState(false);

  useFocusEffect(() => {
    setShouldHide(false)
    return () => {
       setShouldHide(true)
    }
  });

  return shouldHide ? null : <ConnexionPage/>;
};
export default Connexion;