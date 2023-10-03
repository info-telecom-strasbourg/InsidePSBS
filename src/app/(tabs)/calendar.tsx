import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { logout } from "@/utils/auth";

const Calendar = () => {
  const router = useRouter();
  console.log("Calendar");
  return (
    <View>
      <Text>Calendar</Text>
      <TouchableOpacity onPress={() => router.push("/cgu")}>
        <Text>CGU</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Calendar;
