import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
const Page = () => {
  const { slug } = useLocalSearchParams();
  if (slug === "visualization") {
    return <AnnouncementFormScreen />;
  }
};

export default Page;
