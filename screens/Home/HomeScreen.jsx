import React from "react";
import DefaultTopbar from "../../components/topbar/DefaultTopbar";
import WidgetSection from "./widgets/WidgetSection";
import { TEXT } from "../../constants";
import { View } from "react-native";

const HomeScreen = () => {
  return (
    <>
      <DefaultTopbar>{TEXT.common.app_name}</DefaultTopbar>
      <WidgetSection />
    </>
  );
};

export default HomeScreen;
