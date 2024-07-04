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
            <View className="h-32 w-20 items-center">
              <View
                className="size-20 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor:
                    selectedId === item.id
                      ? categories[index].color
                      : colors[theme].popover,
                }}
              >
                <Icon
                  size={24}
                  color={
                    selectedId === item.id ? "white" : categories[index].color
                  }
                />
              </View>
              <View className="flex-1 justify-center">
                <Typography
                  className={cn(
                    selectedId === item.id
                      ? `text-${categories[index].color}`
                      : "text-foreground",
                    "text-center text-wrap"
                  )}
                  fontWeight="medium"
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
