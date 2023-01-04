import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getAuth() {
  console.log('getAuth');
  if (props.loading==false && props.url=='https://app.its-tps.fr/app-login'){
  try {
    let response = await fetch('https://app.its-tps.fr/app-login');
    let data = await response.json();
    await login(data);
  } catch (error) {
    console.error(error);
  }
}
}

async function login(data){
  username=data["uid"];
  console.log(username);
  await AsyncStorage.setItem('logged',toString( true ) );
  await AsyncStorage.setItem('username', username);
  await AsyncStorage.setItem('displayName',data["displayName"]);
  await AsyncStorage.setItem('mail',data["mail"]);
  await AsyncStorage.setItem('udsDisplayName',data["udsDisplayName"]);
}


function Connexion() {
    return (
      <WebView
        source={{ uri: 'https://app.its-tps.fr/app-login' }}
        style={{ marginTop: 20 }}
        onNavigationStateChange={(props) => {
          getAuth(props);
          }}
      />
      //possible de garder auth à l'aide de ; basicAuthCredentials: { username: 'user', password: 'pass' }
    );
}
export default Connexion;