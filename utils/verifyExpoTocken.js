import { useLocalStorage } from "../contexts/localStorageContext";
import initNotification from "./initNotification";
import axios from "axios";
import { API } from "../constants";

async function subscribePushNotificationsAsync(data, expo_tocken) {
  try {
    await axios.post(
      `${API.url}/api/exponent/devices/subscribe`,
      { expo_token: expo_tocken },
      {
        headers: {
          ...API.headers,
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    console.log("posted the expo-tocken");
  } catch (e) {
    console.error("error", e);
  }
}
const verifyExpoTocken = async () => {
  const { data, pushData } = useLocalStorage();
  const expo_tocken = await initNotification();
  console.log("expo_tocken", expo_tocken, data.expo_tocken);
  if (expo_tocken && expo_tocken !== data.expo_tocken) {
    console.log("posting the expo-tocken", expo_tocken);
    try {
      await subscribePushNotificationsAsync(data, expo_tocken);
      pushData("expo_tocken", expo_tocken);
    } catch (e) {
      console.error(e);
    }
  }
};

export default verifyExpoTocken;
