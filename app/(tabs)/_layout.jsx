import { Tabs } from "expo-router";
import { useTheme } from "../../contexts/themeContext";
import useFetch from "../../hooks/useFetch";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen name="calendar" options={{ headerShown: false }} />
      <Tabs.Screen name="announcements" options={{ headerShown: false }} />
      <Tabs.Screen name="messages" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;
