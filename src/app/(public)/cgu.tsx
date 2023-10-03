import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

const CGU = () => {
  console.log("Cgu");
  const router = useRouter();
  return (
    <View>
      <Text>CGU</Text>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text>Index</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CGU;
