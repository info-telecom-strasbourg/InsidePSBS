import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import AnnouncementFormScreen from "../../../screens/Form/AnnouncementFormScreen";
import EventFormScreen from "../../../screens/Form/EventFormScreen";
const Page = () => {
  const { slug } = useLocalSearchParams();
  if (slug === "announcement") {
    return <AnnouncementFormScreen />;
  }
  if (slug === "add_event") {
    return <EventFormScreen />;
  }
  return <View />;
};

export default Page;
