import { Stack } from "expo-router";
import React from "react";

const ModalsLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    />
  );
};

export default ModalsLayout;
