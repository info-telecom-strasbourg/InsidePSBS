import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

const Auth = () => {
  console.log("Auth");
  const router = useRouter();
  return (
    <View>
      <Text>Auth</Text>
      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Auth;
