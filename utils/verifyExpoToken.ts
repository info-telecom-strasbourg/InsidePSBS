import axios from "axios";
import API from "constants/api";

import { env } from "./env";

async function subscribePushNotificationsAsync(data, expo_token) {
  try {
    await axios.post(
      `${env.API_URL}/api/exponent/devices/subscribe`,
      { expo_token },
      {
        headers: {
          ...API.headers,
          Authorization: `Bearer ${data.token}`,
        },
      },
    );
    console.log("posted the expo-token");
  } catch (e) {
    console.error("error", e);
  }
}
const verifyExpoToken = async (expo_token, data, pushData) => {
  console.log("expo_token", expo_token);
  if (expo_token && expo_token !== data.expo_token) {
    console.log("posting the expo-token", expo_token);
    try {
      await subscribePushNotificationsAsync(data, expo_token);
      pushData("expo_token", expo_token);
    } catch (e) {
      console.error(e);
    }
  }
};

export default verifyExpoToken;
