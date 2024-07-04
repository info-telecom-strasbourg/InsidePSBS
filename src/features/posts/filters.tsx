import { Typography } from "@/components/primitives/typography";
import type { CategoriesData } from "@/schemas/posts/categories.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import {
  Bed,
  BookCheck,
  Building,
  Key,
  Smile,
  Star,
} from "lucide-react-native";
import { FlatList, TouchableOpacity, View } from "react-native";

export type FiltersProps = {
  data: CategoriesData["data"] | undefined;
  selectedId: number;
  setSelectedId: (id: number) => void;
};

const categories = [
  { color: "#9208D2", icon: Star },
  { color: "#0865D2", icon: BookCheck },
  { color: "#0865D2", icon: BookCheck },
  { color: "#D27508", icon: Smile },
  { color: "#D22C08", icon: Bed },
  { color: "#08D241", icon: Key },
  { color: "#D2BE08", icon: Building },
];

export const Filters = ({ data, selectedId, setSelectedId }: FiltersProps) => {
  const { theme } = useTheme();
  return (
    <FlatList
      data={data}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-3"
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => {
        const Icon = categories[index].icon;
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedId(item.id);
            }}
          >
            <View className="text-foregound">
              <View className="items-center rounded-2xl bg-popover p-3">
                <Icon
                  size={24}
                  color={
                    selectedId === item.id
                      ? colors[theme].foreground
                      : categories[index].color
                  }
                />
              </View>
              <View className="truncate">
                <Typography
                  className={
                    selectedId === item.id
                      ? `text-${categories[index].color}`
                      : "text-foreground"
                  }
                >
                  {item.name}
                </Typography>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
