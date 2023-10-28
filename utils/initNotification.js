import { useNotifications } from '../hooks/useNotifications';
import * as Notifications from 'expo-notifications';

import { useEffect } from "react";

const initNotification = async () => {
    const {registerForPushNotificationsAsync, handleNotificationResponse} = useNotifications() ;
    const expo_token = await registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
    });
    const responseListener = Notifications.addNotificationResponseReceivedListener( handleNotificationResponse );
    // if (responseListener) {
    //   Notifications.removeNotificationSubscription(responseListener);
    // };
    return expo_token;
};
export default initNotification;