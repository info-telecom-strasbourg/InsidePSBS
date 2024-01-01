import { Stack } from "expo-router";
import { View } from "react-native";

import { useTheme } from "../../contexts/themeContext";

const AuthLayout = () => {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
          // backgroundColor: COLORS.primary,
        }}
        // cardStyle={{ backgroundColor: COLORS.primary }}
      />
    </View>
  );
};

export default AuthLayout;
