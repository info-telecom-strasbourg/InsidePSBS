import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { PlusButton } from "@app/(tabs)/_features/plus-button";
import { PublishBottomSheet } from "@app/(tabs)/_features/publish-bottom-sheet";
import { TabIcon } from "@app/(tabs)/_features/tab-icon";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Tabs } from "expo-router";
import { Calendar, CircleUserIcon, Home, Megaphone } from "lucide-react-native";
import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function TabsLayout() {
  const { theme } = useTheme();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);

  const rotation = useSharedValue<number>(0);

  // BottomSheet Modal
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  if (isModalOpened) {
    bottomSheetRef.current?.present();
    rotation.value = 45;
  } else {
    bottomSheetRef.current?.dismiss();
    rotation.value = 0;
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
            name="home/index"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} name="Accueil" icon={Home} />
              ),
            }}
          />
          <Tabs.Screen
            name="calendar/index"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} name="Calendrier" icon={Calendar} />
              ),
            }}
          />
          <Tabs.Screen
            name="create/index"
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
            name="posts/index"
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
            name="profile/index"
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
          style={{
            zIndex: -100,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
          }}
          ref={bottomSheetRef}
          snapPoints={["30%"]}
          enablePanDownToClose
          enableDismissOnClose
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
          overDragResistanceFactor={1}
          onChange={(e) => setIsModalOpened(e === 0)}
          backgroundStyle={{ backgroundColor: colors[theme].secondary }}
          backdropComponent={() => (
            <BottomSheetBackdrop
              pressBehavior={"close"}
              animatedIndex={animatedIndex}
              animatedPosition={animatedPosition}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
            ></BottomSheetBackdrop>
          )}
        >
          <BottomSheetView className="gap-6 p-4">
            <PublishBottomSheet setIsModalOpened={setIsModalOpened} />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
