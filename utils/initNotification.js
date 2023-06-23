import { useNotifications } from '../hooks/useNotifications';
import * as Notifications from 'expo-notifications';

import { useEffect } from "react";

const initNotification = () => {
    const {registerForPushNotificationsAsync, handleNotificationResponse} = useNotifications() ;
    useEffect(() => {
      var tocken;
      tocken=registerForPushNotificationsAsync();
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
      const responseListener = Notifications.addNotificationResponseReceivedListener( handleNotificationResponse );
      return () => {
        if (responseListener) {
          Notifications.removeNotificationSubscription(responseListener);
        };
      };
    }, []);
    };
export default initNotification;