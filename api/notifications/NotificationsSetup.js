import React,{useState,useRef,useEffect} from 'react';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


const [expoPushToken, setExpoPushToken] = useState('');
const [notification, setNotification] = useState(false);
const notificationListener = useRef();
const responseListener = useRef();

useEffect(() => {
registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);  });

responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);  });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
  export async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "première notification !",
        body: "C'est la première notification de toute l'application !",
        data: { data: 'goes here' },
      },
      trigger: { seconds: 1 },
    });
  }
  
  export async function registerForPushNotificationsAsync() {
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



