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
import { useMemo, useRef, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedBackdrop = Animated.createAnimatedComponent(Pressable);

export default function TabsLayout() {
  const { theme } = useTheme();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const rotation = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(30);

  const snapPoints = useMemo(() => ["30%"], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  if (isModalOpened) {
    bottomSheetRef.current?.present();
    rotation.value = 45;
    opacity.value = withTiming(opacity.value + 0.5);
  } else {
    bottomSheetRef.current?.close();
    rotation.value = 0;
    opacity.value = withTiming(opacity.value - 0.5);
  }

  const toggleModal = () =>
    isModalOpened ? setIsModalOpened(false) : setIsModalOpened(true);
  return (
    <>
      <BottomSheetModalProvider>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: colors[theme].secondary,
              borderTopWidth: 0,
              paddingTop: 4,
              zIndex: 10,
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
                    toggleModal();
                  }}
                >
                  <PlusButton rotation={rotation} />
                </TouchableOpacity>
              ),
            }}
          />
          <Tabs.Screen
            name="posts"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  name="Publications"
                  icon={Megaphone}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  name="Profile"
                  icon={CircleUserIcon}
                />
              ),
            }}
          />
        </Tabs>
        <BottomSheetModal
          style={{ zIndex: -100 }}
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          handleIndicatorStyle={{ width: 50 }}
          overDragResistanceFactor={1}
          onChange={(e) => setIsModalOpened(e === 0)}
          backgroundStyle={{ backgroundColor: colors[theme].secondary }}
          backdropComponent={() => (
            <AnimatedBackdrop
              className="absolute size-full bg-black"
              style={{ opacity }}
              onPress={() => setIsModalOpened(false)}
            ></AnimatedBackdrop>
          )}
        >
          <BottomSheetView className="gap-6 p-4">
            <PublishBottomSheet />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
