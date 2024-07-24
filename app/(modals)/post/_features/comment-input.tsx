import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { ArrowUp, PencilLine } from "lucide-react-native";
import { TextInput, View } from "react-native";

export const CommentInput = () => {
  const { theme } = useTheme();
  return (
    <>
      <PencilLine
        strokeWidth={1.5}
        color={colors[theme].mutedForeground}
        size={24}
      />
      <TextInput
        // value={searchPhrase}
        // onChangeText={(searchPhrase) => setSearchPhrase(searchPhrase)}
        className="flex-1 rounded-2xl p-2 text-foreground"
        placeholder="Écrivez un commentaire"
        placeholderTextColor={colors[theme].mutedForeground}
        style={{ fontFamily: "SpaceGrotesk-medium" }}
      />
      <View className="mr-2 rounded-full bg-primary p-2">
        <ArrowUp
          strokeWidth={2}
          color={colors[theme].primaryForeground}
          size={24}
        />
      </View>
    </>
  );
};
