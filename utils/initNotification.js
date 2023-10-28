import { useNotifications } from '../hooks/useNotifications';
import * as Notifications from 'expo-notifications';
import verifyExpoTocken from './verifyExpoTocken';
import { useEffect } from "react";

const initNotification = async (data,pushData) => {
    const {registerForPushNotificationsAsync, handleNotificationResponse} = useNotifications() ;
    const expo_token = await registerForPushNotificationsAsync();
    await verifyExpoTocken(expo_token,data,pushData);
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
    });
    const responseListener = Notifications.addNotificationResponseReceivedListener( handleNotificationResponse );
    if (responseListener) {
      Notifications.removeNotificationSubscription(responseListener);
    };  
};
export default initNotification;