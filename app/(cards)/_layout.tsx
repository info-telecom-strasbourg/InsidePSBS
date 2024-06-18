import { Stack } from "expo-router";
import React from "react";

const AssosLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[query]" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default AssosLayout;
