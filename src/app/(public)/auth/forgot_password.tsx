import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

const ForgotPassword = () => {
  console.log("Forgot Password");
  const router = useRouter();
  return (
    <View>
      <Text>Forgot Password</Text>
      <TouchableOpacity onPress={() => router.push("/cgu")}>
        <Text>CGU</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
