import { AnnouncementIcon, CalendarIcon, HomeIcon } from "@/assets/icons";
import { useTheme } from "@/contexts/ThemeContext";
import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.text,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Accueil", tabBarIcon: HomeIcon }}
      />
      <Tabs.Screen
        name="calendar"
        options={{ title: "Calendrier", tabBarIcon: CalendarIcon }}
      />
      <Tabs.Screen
        name="announcements"
        options={{ title: "Annonces", tabBarIcon: AnnouncementIcon }}
      />
    </Tabs>
  );
};

export default TabLayout;
