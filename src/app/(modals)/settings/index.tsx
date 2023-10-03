import { useRouter } from "expo-router";
import { Text, View } from "react-native";

const Settings = () => {
  const router = useRouter();
  console.log("Settings");
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
