import React,{useState,useRef,useEffect} from 'react';
import { View, Text, Image, Button, TouchableOpacity, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';



import { styles, primaryColor } from '../style/style';

import {version} from '../package.json';

/**
 * fonction qui affiche la page de profil/paramètres 
 * @returns {View} élément graphique: page de profil/paramètres
 */
const ProfilePage = ({ }) => {
  const [Nom, setNom] = React.useState('');
  const [Prenom, setPrenom] = React.useState('');

  const navigation = useNavigation();
  AsyncStorage.getItem('nom').then((value) => setNom(value));
  AsyncStorage.getItem('prenom').then((value) => setPrenom(value));


  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);



  return (

    <View style={{ flexDirection: "column", backgroundColor: primaryColor, flex: 1, justifyContent: 'space-between', alignContent: 'center' }}>
      <View style={{ flex: 1 }}>
        <Text style={{ marginTop: 30, color: 'white', alignSelf: 'center', lineHeight: 30, fontSize: 20 }}>Nom: {Nom} {"\n"}Prénom: {Prenom}</Text>
      </View>
      <View style={{ flex: 3 }}>
        <TouchableOpacity style={styles.appButtonContainer} onPress={() => AsyncStorage.setItem('logged', 'false').then(navigation.navigate('Connexion'))}>
          <Text style={styles.appButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
      <Text style={{ fontSize: 20, textAlign: 'center', flex: 1, color: 'white', alignSelf: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}>Application développée par {'\n'}Gatien Chenu et Félix Lusseau.{'\n'} Graphismes réalisés par {'\n'}Jeanne König-Wacheux</Text>
      <Text style={{ flex: 1, color: 'white', alignSelf: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}>Version {version}</Text>

      <View style={{ backgroundColor: primaryColor, flex: 1 }}></View>
    </View>

  );
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "première notification !",
      body: "C'est la première notification de toute l'application !",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default ProfilePage;
