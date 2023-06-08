import { Tabs } from "expo-router";

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
