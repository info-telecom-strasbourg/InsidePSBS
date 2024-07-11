import { PageLoading } from "@/components/page/loading";
import { PageContainer } from "@/components/primitives/container";
import CustomModal from "@/components/primitives/custom-modal";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useFilters } from "@/queries/posts/filters.query";
import { useMe } from "@/queries/profile/me.query";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { SpaceGroteskFont } from "@/utils/custom-font";
import {
  CoreBridge,
  PlaceholderBridge,
  RichText,
  TenTapStartKit,
  Toolbar,
  useEditorBridge,
} from "@10play/tentap-editor";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ArrowRight, ChevronDown, TriangleAlert } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";

const CreatePostPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { data } = useMe();
  const { data: filters, isLoading: filtersAreLoading } = useFilters(null);

  const { theme } = useTheme();

  const customFont = `${SpaceGroteskFont}
 * {
    font-family: 'Space Grotesk', sans-serif;
  }
    `;

  const customCSS = `* {
    background-color: ${colors[theme].background};
    color: ${colors[theme].foreground};
    margin-top: 0;
    placeholder: 
  }`;

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    bridgeExtensions: [
      ...TenTapStartKit,
      PlaceholderBridge.configureExtension({
        placeholder: "Raconte ta vie ici...",
      }),
      CoreBridge.configureCSS(customCSS + customFont),
    ],
  });

  editor.injectCSS(customCSS + customFont, "*");

  const optionsBottomSheet = useRef<BottomSheetModal>(null);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);

  return (
    <BottomSheetModalProvider>
      <CustomModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        setIsOpen={setModalOpen}
      >
        <View className="w-full justify-center rounded-2xl bg-popover p-6">
          <View className="mb-4 flex-row items-center gap-4">
            <TriangleAlert size={24} color={colors[theme].destructive} />
            <Typography size="h4" className="text-foreground" fontWeight="bold">
              Erreur !
            </Typography>
          </View>
          <Typography size="h5">
            Vous ne pouvez pas publier un message vide !
          </Typography>
          <View className="flex-row items-center justify-end gap-8">
            <TouchableOpacity
              onPress={() => setModalOpen(false)}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalOpen(false)}
              className="flex-row items-center gap-4"
            >
              <Typography fontWeight="medium" size="h3">
                Continuer
              </Typography>
              <ArrowRight size={24} color={colors[theme].foreground} />
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
      <PageContainer>
        <Header title="Publier un post" rightIcon="close" leftIcon="back" />
        <View className="mb-5 w-full flex-row items-center justify-between">
          {data?.organizations ? (
            <TouchableOpacity className="flex-row items-center gap-3">
              <Image
                source={{ uri: data?.data.avatar_url }}
                className="size-16 rounded-full"
                resizeMode="contain"
              />
              <Typography size="h4" fontWeight="medium">
                {data?.data.first_name} {data?.data.last_name}
              </Typography>
              <ChevronDown size={20} color={colors[theme].foreground} />
            </TouchableOpacity>
          ) : (
            <View className="flex-row">
              <Typography size="h4" fontWeight="medium">
                {data?.data.first_name} {data?.data.last_name}
              </Typography>
            </View>
          )}
          <TouchableOpacity
            onPress={async () => {
              const post = await editor.getJSON();
              if (!post) setModalOpen(true);
              else {
                Keyboard.dismiss();
                optionsBottomSheet.current?.present();
              }
            }}
          >
            <View className="rounded-full bg-primary p-3">
              <Typography className="text-white" fontWeight="medium" size="h4">
                Suivant
              </Typography>
            </View>
          </TouchableOpacity>
        </View>
        <RichText editor={editor} />
      </PageContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="absolute bottom-0 w-full"
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
      <BottomSheetModal
        style={{
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
        ref={optionsBottomSheet}
        snapPoints={["70%"]}
        enablePanDownToClose
        enableDismissOnClose
        overDragResistanceFactor={1}
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
          <Typography size="h1" fontWeight="bold">
            Catégories
          </Typography>
          <View className="flex-row flex-wrap gap-4">
            {!filters || filtersAreLoading ? (
              <PageLoading />
            ) : (
              filters.map((item, index) => {
                return (
                  <View
                    key={index}
                    className="rounded-full px-4 py-1"
                    style={{
                      borderColor: item.color,
                      borderWidth: 1,
                    }}
                  >
                    <Typography size="p">
                      {item.emoji} {item.name}
                    </Typography>
                  </View>
                );
              })
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default CreatePostPage;
