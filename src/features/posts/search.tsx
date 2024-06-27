import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { SearchIcon } from "lucide-react-native";
import { TextInput, View } from "react-native";

export type SearchProps = {
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
};

export const Search = ({ searchPhrase, setSearchPhrase }: SearchProps) => {
  const { theme } = useTheme();

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
