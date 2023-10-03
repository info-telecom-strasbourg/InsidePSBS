import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { logout } from "@/utils/auth";

const Announcements = () => {
  const router = useRouter();
  console.log("Announcements");
  return (
    <View>
      <Text>Announcements</Text>
      <TouchableOpacity onPress={() => router.push("/cgu")}>
        <Text>CGU</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Announcements;
