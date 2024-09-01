import { useAuth } from "@/auth/useAuth";
import { routes } from "@/constants/routes";
import { CarouselModal } from "@/features/post/carousel-modal";
import { MediaCarouselProvider } from "@/features/post/media-carousel.context";
import { PlusButton } from "@/features/tabs/plus-button";
import { PublishBottomSheet } from "@/features/tabs/publish-bottom-sheet";
import { TabIcon } from "@/features/tabs/tab-icon";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type { Href } from "expo-router";
import { Redirect, Tabs } from "expo-router";
import { Calendar, CircleUserIcon, Home, Megaphone } from "lucide-react-native";
import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function TabsLayout() {
  const { theme } = useTheme();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { isAuthenticated } = useAuth();
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

  if (!isAuthenticated) return <Redirect href={routes.root as Href} />;

  return (
    <BottomSheetModalProvider>
      <MediaCarouselProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
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
                  name="Profil"
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
        <CarouselModal />
      </MediaCarouselProvider>
    </BottomSheetModalProvider>
  );
}
