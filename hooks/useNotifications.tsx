import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Linking, Platform } from "react-native";

// hook to handle push notifications
export const useNotifications = () => {
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "61177b6a-7651-4fcf-8e36-b10e30374c5c",
        })
      ).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const handleNotification = (notification) => {
    console.log("notification", notification);
  };
  const handleNotificationResponse = (response) => {
    const data = response.notification.request.content.data;
    if (data?.url) {
      Linking.openURL(data.url);
    }
  };

  return {
    registerForPushNotificationsAsync,
    handleNotification,
    handleNotificationResponse,
  };
};
