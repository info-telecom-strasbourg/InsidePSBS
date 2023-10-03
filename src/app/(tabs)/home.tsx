import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const router = useRouter();
  console.log("Home");
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => router.push("/cgu")}>
        <Text>CGU</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
