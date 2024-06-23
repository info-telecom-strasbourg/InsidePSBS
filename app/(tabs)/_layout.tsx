import { routes } from "@/constants/routes";
import { PlusButton } from "@/features/layout/plus-button";
import { TabIcon } from "@/features/layout/tab-icon";
import { useModalRouter } from "@/hooks/useModalRouter";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Tabs } from "expo-router";
import { Calendar, CircleUserIcon, Home, Megaphone } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function TabsLayout() {
  const { theme } = useTheme();
  const modalRouter = useModalRouter();
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors[theme].secondary,
            borderTopWidth: 0,
            paddingTop: 13,
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
            tabBarButton: () => (
              <TouchableOpacity
                className="-top-8"
                onPress={() => {
                  // TODO : Implémenter le modal pour choisir post ou annonce
                  modalRouter.open(routes.create_post);
                }}
              >
                <PlusButton />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="posts"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name="Publications" icon={Megaphone} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name="Profile" icon={CircleUserIcon} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
