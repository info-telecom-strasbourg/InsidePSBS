import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {Linking, Platform } from "react-native";

// hook to handle push notifications
export const useNotifications = () => {
async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        console.log('existingStatus', existingStatus);
        try {
          await Notifications.requestPermissionsAsync()
          console.log('try');
          console.log('blabla')
          console.log('status', status);
          finalStatus = status;
        }
        catch (e) {
          console.log('error', e);
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
          console.log('raté', status);
        }
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("!!! token !!!\n",token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

 const handleNotification = (notification) => {
    console.log('notification', notification);
  }
  const handleNotificationResponse = (
    response
    ) => {
    const data  = response.notification.request.content.data;
    if (data?.url) {Linking.openURL(data.url);}};







  return { registerForPushNotificationsAsync, handleNotification, handleNotificationResponse };
}
