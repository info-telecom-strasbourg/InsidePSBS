import { Stack } from "expo-router";

const SettingsLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    />
  );
};

export default SettingsLayout;
