import { CustomModal } from "@/components/primitives/custom-modal";
import { Typography } from "@/components/primitives/typography";
import type { UpdatePostInfoType } from "@/contexts/create-post.context";
import { useCreatePost } from "@/contexts/create-post.context";
import { useModalRouter } from "@/hooks/useModalRouter";
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
import { PostBodySchema } from "@app/(modals)/create/post/step2/_features/store-post.schema";
import { useMe } from "@app/(tabs)/profile/_features/me.query";
import type { ItsMeUserData } from "@app/(tabs)/profile/_features/me.schema";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import {
  ArrowRight,
  ChevronDown,
  Circle,
  TriangleAlert,
} from "lucide-react-native";
import { useMemo, useRef, useState } from "react";
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalRouter = useModalRouter();
  const { theme } = useTheme();

  const { data } = useMe();

  const organizationBottomSheet = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["45%"], []);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);

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
    autofocus: false,
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

  const { organizationId, updatePostInfo } = useCreatePost();

  return (
    <>
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

      <View className="mb-5 w-full flex-row items-center justify-between">
        {data?.organizations ? (
          organizationId ? (
            <TouchableOpacity
              className="flex-row items-center gap-3"
              onPress={() => {
                Keyboard.dismiss();
                organizationBottomSheet.current?.present();
              }}
            >
              <Image
                source={{
                  uri: data.organizations.filter(
                    (item) => item.id === organizationId
                  )[0].logo_url,
                }}
                className="size-16 rounded-full"
                resizeMode="cover"
              />
              <Typography size="h4" fontWeight="medium">
                {
                  data.organizations.filter(
                    (item) => item.id === organizationId
                  )[0].name
                }
              </Typography>
              <ChevronDown size={20} color={colors[theme].foreground} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="flex-row items-center gap-3"
              onPress={() => organizationBottomSheet.current?.present()}
            >
              <Image
                source={{ uri: data?.data.avatar_url }}
                className="size-16 rounded-full"
                resizeMode="cover"
              />
              <Typography size="h4" fontWeight="medium">
                {data?.data.first_name} {data?.data.last_name}
              </Typography>
              <ChevronDown size={20} color={colors[theme].foreground} />
            </TouchableOpacity>
          )
        ) : (
          <View className="flex-row">
            <Typography size="h4" fontWeight="medium">
              {data?.data.first_name} {data?.data.last_name}
            </Typography>
          </View>
        )}
        <TouchableOpacity
          onPress={async () => {
            Keyboard.dismiss();
            const test = await editor.getText();

            if (!test) setModalOpen(true);
            else {
              const postBody = await editor.getJSON();
              updatePostInfo(
                "postBody",
                PostBodySchema.safeParse(postBody).data
              );
              modalRouter.open("/create/post/step2");
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
          padding: 15,
        }}
        ref={organizationBottomSheet}
        snapPoints={snapPoints}
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
        <BottomSheetScrollView>
          <TouchableOpacity
            className="flex-row items-center justify-between"
            onPress={() => {
              organizationBottomSheet.current?.dismiss();
              updatePostInfo("organizationId", null);
            }}
          >
            <View className="flex-1 flex-row items-center gap-4">
              <Image
                source={{ uri: data?.data.avatar_url }}
                className="size-14"
                resizeMode="cover"
              />
              <Typography
                size="h4"
                fontWeight="medium"
                className="line-clamp-1"
              >
                {data?.data.first_name} {data?.data.last_name}
              </Typography>
            </View>
            <Circle
              size={20}
              fill={
                organizationId === null
                  ? colors[theme].primary
                  : colors[theme].secondary
              }
              color={
                organizationId === null
                  ? colors[theme].primary
                  : colors[theme].secondary
              }
            />
          </TouchableOpacity>
          {data?.organizations.map((item, index) => (
            <RenderOrganization
              key={index}
              organization={item}
              organizationId={organizationId}
              updatePostInfo={updatePostInfo}
              organizationBottomSheet={organizationBottomSheet}
            />
          ))}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

const RenderOrganization = ({
  organization,
  organizationId,
  updatePostInfo,
  organizationBottomSheet,
}: {
  organization: ItsMeUserData["organizations"][0];
  organizationId: number | null;
  updatePostInfo: UpdatePostInfoType;
  organizationBottomSheet: React.RefObject<BottomSheetModal>;
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        organizationBottomSheet.current?.dismiss();
        updatePostInfo("organizationId", organization.id);
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <Image
            source={{ uri: organization.logo_url }}
            className="size-14"
            resizeMode="cover"
          />
          <Typography size="h4" fontWeight="medium" className="line-clamp-1">
            {organization.name}
          </Typography>
        </View>
        <Circle
          size={20}
          fill={
            organizationId === organization.id
              ? colors[theme].primary
              : colors[theme].secondary
          }
          color={
            organizationId === organization.id
              ? colors[theme].primary
              : colors[theme].secondary
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default CreatePostPage;
