import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
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
import { ChevronDown } from "lucide-react-native";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";

const CreatePostPage = () => {
  const { data } = useMe();
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

  return (
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
            const post = await editor.getHTML();
            console.log(post);
          }}
        >
          <View className="rounded-full bg-primary p-3">
            <Typography className="text-white" fontWeight="medium" size="h4">
              Publier
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
    </PageContainer>
  );
};

export default CreatePostPage;
