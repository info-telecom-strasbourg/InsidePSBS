import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

import VizualisationScreen from "../../../screens/Fouaille/VizualisationScreen";
const Page = () => {
  const { slug } = useLocalSearchParams();
  if (slug === "vizualisation") {
    return <VizualisationScreen />;
  }
};

export default Page;
