import { TabIcon } from "@/features/layout/tab-icon";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Tabs } from "expo-router";
import { Calendar, Home, Megaphone, Settings } from "lucide-react-native";

const TabsLayout = () => {
  const { theme } = useTheme();
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors[theme].secondary,
            height: 70,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name="Accueil" icon={Home} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name="Calendrier" icon={Calendar} />
            ),
          }}
        />
        <Tabs.Screen
          name="announcements"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name="Annonces" icon={Megaphone} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name="Paramètres" icon={Settings} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
