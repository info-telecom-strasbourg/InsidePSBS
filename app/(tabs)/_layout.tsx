import { TabIcon } from "@/features/layout/tab-icon";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Tabs } from "expo-router";
import {
  Calendar,
  Home,
  Megaphone,
  MessageSquare,
  Plus,
} from "lucide-react-native";

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
          name="create"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name="" icon={Plus} />
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
          name="messages"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name="Messages" icon={MessageSquare} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
