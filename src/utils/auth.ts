import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (redirect = () => {}) => {
  try {
    const token = await AsyncStorage.setItem("token", "token");
    return token;
  } catch (error) {
    console.error(error);
  }
  redirect();
};

export const logout = async (redirect = () => {}) => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error(error);
  }
  redirect();
};
