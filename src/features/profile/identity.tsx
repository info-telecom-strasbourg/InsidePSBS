import { useAuth } from "@/auth/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { ItsMeUserSchema } from "@/schemas/user.schema";
import { Text, View } from "react-native";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = ItsMeUserSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data;
};

export const useIdentity = () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/user/me`;
  const { token } = useAuth();

  const res = useFetch(url, (url: string) => fetcher(url, token || ""));
  return res;
};

const Identity = () => {
  return (
    <View>
      <Text>Identity</Text>
    </View>
  );
};

export default Identity;
