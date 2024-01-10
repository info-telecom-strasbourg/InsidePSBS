import COLORS from "constants/colors";
import { useTheme } from "contexts/themeContext";
import { Tabs } from "expo-router";

import {
  AnnouncementIcon,
  CalendarIcon,
  HomeIcon,
} from "../../../assets/icons";

const TabLayout = () => {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // animation: "fade",
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: theme.text,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          elevation: 0,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{ title: "Accueil", tabBarIcon: HomeIcon }}
      />
      {/* TODO: Add the calendar screen */}
      <Tabs.Screen
        name="calendar"
        options={{ title: "Calendrier", tabBarIcon: CalendarIcon }}
      />
      <Tabs.Screen
        name="announcements"
        options={{ title: "Annonces", tabBarIcon: AnnouncementIcon }}
      />
      {/*<Tabs.Screen*/}
      {/*  name="messages"*/}
      {/*  options={{ title: "Messages", tabBarIcon: MessagesIcon }}*/}
      {/*/>*/}
    </Tabs>
  );
};

export default TabLayout;
