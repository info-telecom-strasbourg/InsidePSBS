import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

const Login = () => {
  console.log("Login");
  const router = useRouter();
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity onPress={() => router.push("/auth/forgot_password")}>
        <Text>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
