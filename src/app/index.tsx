import { login } from "@/utils/auth";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const AppIndex = () => {
  console.log("Index");
  const router = useRouter();
  return (
    <View>
      <Text>Index</Text>
      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/home")}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => login()}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AppIndex;
