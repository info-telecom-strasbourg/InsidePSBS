import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { logout } from "@/utils/auth";

const Home = () => {
  const router = useRouter();
  console.log("Home");
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => router.push("/cgu")}>
        <Text>CGU</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={async () => logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
