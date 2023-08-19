import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import AnnouncementFormScreen from "../../../screens/Form/AnnouncementFormScreen";

const Page = () => {
  const { slug } = useLocalSearchParams();
  if (slug === "announcement") {
    return <AnnouncementFormScreen />;
  }
  return <View />;
};

export default Page;
