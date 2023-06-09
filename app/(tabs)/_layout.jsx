import { Tabs } from "expo-router";
import {
  AnnouncementIcon,
  CalendarIcon,
  HomeIcon,
  MessagesIcon,
} from "../../assets/icons";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
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
      <Tabs.Screen
        name="messages"
        options={{ title: "Messages", tabBarIcon: MessagesIcon }}
      />
    </Tabs>
  );
};

export default TabLayout;
