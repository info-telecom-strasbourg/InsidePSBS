import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async () => {
  try {
    const token = await AsyncStorage.setItem("token", "token");
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error(error);
  }
};
