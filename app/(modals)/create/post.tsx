import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useMe } from "@/queries/profile/me.query";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import type { LucideIcon } from "lucide-react-native";
import { Bold, ChevronDown, Italic, Underline } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

const reservedInput = {
  bold: "\\bold",
  italic: "\\italic",
  underline: "\\underline",
};

type reservedInputKey = keyof typeof reservedInput;

export default function CreatePostPage() {
  const [input, setInput] = useState<string>("");
  const [selectedButton, setSelectedButton] = useState<
    Record<reservedInputKey, boolean>
  >({
    bold: false,
    italic: false,
    underline: false,
  });
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { data } = useMe();
  const { theme } = useTheme();

  const start_p = input.slice(0, selection.start);
  const content_p = input.slice(selection.start, selection.end);
  const end_p = input.slice(selection.end);

  const moveSelection = (size: number) => {
    setSelection((p) => ({
      start: p.start + size,
      end: p.end + size,
    }));
  };

  const parseInput = (inputKey: reservedInputKey) => {
    const keyword = reservedInput[inputKey];
    setInput(() => {
      switch (true) {
        case start_p.endsWith(keyword) && end_p.startsWith(keyword):
          moveSelection(-keyword.length);
          return `${start_p.slice(
            0,
            start_p.length - keyword.length
          )}${content_p}${end_p.slice(keyword.length)}`;
        case start_p.endsWith(keyword):
          moveSelection(-keyword.length);
          return `${start_p.slice(
            0,
            start_p.length - keyword.length
          )}${content_p}${keyword}${end_p}`;
        case end_p.startsWith(keyword):
          moveSelection(keyword.length);
          return `${start_p}${keyword}${content_p}${end_p.slice(
            keyword.length
          )}`;
        default:
          moveSelection(keyword.length);
          return `${start_p}${keyword}${content_p}${keyword}${end_p}`;
      }
    });
  };
  // exécutée quand on appuie sur un bouton de la toolbar
  const toggleInputKind = (key: reservedInputKey) => {
    parseInput(key);

    setSelectedButton((previous_state) => ({
      ...previous_state,
      [key]: !previous_state[key],
    }));
  };

  useEffect(() => {
    const bold_regex = /\\bold/g;
    const bold_count = start_p.match(bold_regex)?.length;
    if (!bold_count || bold_count % 2 === 0)
      setSelectedButton((p) => ({ ...p, bold: false }));
    else setSelectedButton((p) => ({ ...p, bold: true }));
  }, [start_p]);

  return (
    <BottomSheetModalProvider>
      <PageContainer>
        <Header title="Publier un post" rightIcon="close" leftIcon="back" />
        <View className="flex-1 items-center">
          <View className="mb-5 w-full flex-row items-center justify-between">
            {data?.organizations ? (
              <TouchableOpacity
                onPress={() => bottomSheetRef.current?.present()}
                className="flex-row items-center gap-3"
              >
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
            <TouchableOpacity>
              <View className="rounded-full bg-primary p-3">
                <Typography
                  className="text-white"
                  fontWeight="medium"
                  size="h4"
                >
                  Publier
                </Typography>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView className="w-full flex-1">
            <TextInput
              placeholder="Raconte ta vie ici"
              className="flex-1 items-start text-wrap text-lg"
              multiline
              value={input}
              onChangeText={setInput}
              onSelectionChange={({ nativeEvent }) =>
                setSelection(nativeEvent.selection)
              }
              selection={selection}
              style={{
                fontFamily: "SpaceGrotesk-regular",
              }}
            />
          </ScrollView>
          <KeyboardAvoidingView className="absolute bottom-0 m-3 flex-row items-center justify-center overflow-hidden rounded-2xl bg-popover">
            <ToolButton
              icon={Bold}
              state={selectedButton.bold}
              toggleState={() => toggleInputKind("bold")}
            />
            <ToolButton
              icon={Italic}
              state={selectedButton.italic}
              toggleState={() => toggleInputKind("italic")}
            />
            <ToolButton
              icon={Underline}
              state={selectedButton.underline}
              toggleState={() => toggleInputKind("underline")}
            />
          </KeyboardAvoidingView>
        </View>
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
          snapPoints={["15%"]}
          enablePanDownToClose
          overDragResistanceFactor={1}
        >
          <BottomSheetFlatList
            data={data?.organizations}
            renderItem={({ item }) => (
              <>
                {/* <Image source={{ uri: item }} /> */}
                <Typography size="h3" fontWeight="medium">
                  {item.name}
                </Typography>
              </>
            )}
            contentContainerClassName="p-3"
          />
        </BottomSheetModal>
      </PageContainer>
    </BottomSheetModalProvider>
  );

  function ToolButton({
    icon: Icon,
    state,
    toggleState,
  }: {
    icon: LucideIcon;
    state: boolean;
    toggleState: () => void;
  }) {
    return (
      <TouchableOpacity
        onPress={toggleState}
        className={cn("p-3", state && "bg-foreground")}
      >
        <Icon
          size={24}
          color={state ? colors[theme].background : colors[theme].foreground}
        />
      </TouchableOpacity>
    );
  }
}
