import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { SearchIcon } from "lucide-react-native";
import { useState } from "react";
import { TextInput, View } from "react-native";

export const Search = () => {
  const { theme } = useTheme();
  const [searchPhrase, setSearchPhrase] = useState("");

  return (
    <View className="flex-row items-center justify-start gap-3 rounded-2xl bg-popover p-2 pl-4">
      <SearchIcon
        strokeWidth={1.5}
        color={colors[theme].mutedForeground}
        size={24}
      />
      <TextInput
        value={searchPhrase}
        onChangeText={(searchPhrase) => setSearchPhrase(searchPhrase)}
        className="flex-1 rounded-2xl p-2 text-foreground"
        placeholder="Rechercher des posts"
        placeholderTextColor={colors[theme].mutedForeground}
        style={{ fontFamily: "SpaceGrotesk-medium" }}
      />
    </View>
  );
};
