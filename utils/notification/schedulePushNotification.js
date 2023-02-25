import * as Notifications from "expo-notifications";
/**
 * function to schedule a local push notification
 */
export async function schedulePushNotification(title,trigger, ) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: "rappel de votre rendez-vous"
      },
      trigger: trigger,
    });
  }