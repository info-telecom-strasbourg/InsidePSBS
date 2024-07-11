import { Typography } from "@/components/primitives/typography";
import type { CategoriesData } from "@/schemas/posts/categories.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
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
  { icon: Star },
  { icon: BookCheck },
  { icon: BookCheck },
  { icon: Smile },
  { icon: Bed },
  { icon: Key },
  { icon: Building },
];

export const Filters = ({ data, selectedId, setSelectedId }: FiltersProps) => {
  const { theme } = useTheme();
  return (
    <FlatList
      data={data}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => {
        const Icon = categories[index].icon;
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedId(item.id);
            }}
            className="mr-4"
          >
            <View className="h-28 w-16 items-center gap-1">
              <View
                className="size-16 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor:
                    selectedId === item.id ? item.color : colors[theme].popover,
                }}
              >
                <Icon
                  size={32}
                  color={selectedId === item.id ? "white" : item.color}
                />
              </View>
              <View className="flex-1 justify-center">
                <Typography
                  size="sm"
                  className={cn(
                    selectedId === item.id ? `text-${item.color}` : null,
                    "text-center text-wrap"
                  )}
                  style={{
                    color:
                      selectedId === item.id
                        ? item.color
                        : colors[theme].foreground,
                    fontFamily: "SpaceGrotesk-medium",
                  }}
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
