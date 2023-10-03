import { logout } from "@/utils/auth";
import { Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  console.log("Profile");
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={async () => logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
