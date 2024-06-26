import { PlusButton } from "@/features/layout/plus-button";
import PublishBottomSheet from "@/features/layout/publish-bottom-sheet";
import { TabIcon } from "@/features/layout/tab-icon";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Tabs } from "expo-router";
import { Calendar, CircleUserIcon, Home, Megaphone } from "lucide-react-native";
import { useCallback, useMemo, useRef } from "react";
import { Pressable, TouchableOpacity } from "react-native";

export default function TabsLayout() {
  const { theme } = useTheme();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors[theme].secondary,
            borderTopWidth: 0,
            paddingTop: 4,
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
                className="-top-7"
                onPress={() => {
                  handlePresentModalPress();
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
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleIndicatorStyle={{ width: 50 }}
        overDragResistanceFactor={1}
        backgroundStyle={{ backgroundColor: colors[theme].secondary }}
        backdropComponent={() => (
          <Pressable
            className="absolute size-full bg-popover opacity-60"
            onPress={() => bottomSheetModalRef.current?.dismiss()}
          ></Pressable>
        )}
      >
        <BottomSheetView className="gap-6 p-4">
          <PublishBottomSheet />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
