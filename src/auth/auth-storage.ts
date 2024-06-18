import { type LoginUser } from "@/schemas/user.schema";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export const saveAuthData = async (
  token: string,
  user: LoginUser
): Promise<void> => {
  try {
    await setItemAsync(TOKEN_KEY, token);
    await setItemAsync(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving auth data", error);
  }
};

export const getAuthData = async (): Promise<{
  token: string | null;
  user: LoginUser | null;
}> => {
  try {
    const token = await getItemAsync(TOKEN_KEY);
    const userString = await getItemAsync(USER_KEY);

    const user = userString ? (JSON.parse(userString) as LoginUser) : null;
    return { token, user };
  } catch (error) {
    console.error("Error getting auth data", error);
    return { token: null, user: null };
  }
};

export const clearAuthData = async (): Promise<void> => {
  try {
    await deleteItemAsync(TOKEN_KEY);
    await deleteItemAsync(USER_KEY);
  } catch (error) {
    console.error("Error clearing auth data", error);
  }
};
