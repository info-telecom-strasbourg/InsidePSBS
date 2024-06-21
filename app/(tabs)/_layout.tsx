import { TabIcon } from "@/features/layout/tab-icon";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Tabs } from "expo-router";
import { Calendar, CircleUserIcon, Home, Megaphone } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import Svg, { Defs, LinearGradient, Path, Rect, Stop } from "react-native-svg";

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
            tabBarButton: () => (
              <TouchableOpacity className="-top-6">
                <Svg width={56} height={56} viewBox="0 0 56 56" fill="none">
                  <Rect width={56} height={56} rx={28} fill="url(#a)" />
                  <Path
                    d="M16.333 28h23.334M28 16.333v23.333"
                    stroke="#fff"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Defs>
                    <LinearGradient
                      id="a"
                      x1={0}
                      y1={0}
                      x2={63.751}
                      y2={10.974}
                      gradientUnits="userSpaceOnUse"
                    >
                      <Stop stopColor="#E03860" />
                      <Stop offset={1} stopColor="#F78115" />
                    </LinearGradient>
                  </Defs>
                </Svg>
              </TouchableOpacity>
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
};

export default TabsLayout;
