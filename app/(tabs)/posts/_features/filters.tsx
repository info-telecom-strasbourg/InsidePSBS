import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import type { CategoriesData } from "@app/(tabs)/posts/_features/fetch/categories.schema";
import {
  Bed,
  BookCheck,
  Building,
  Key,
  Smile,
  Star,
} from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data?.map((item, index) => {
        const Icon = categories[index].icon;
        return (
          <TouchableOpacity
            key={index}
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
      })}
    </ScrollView>
  );
};

const SkeletonFilters = () => {
  const { theme } = useTheme();
  return (
    <Skeleton.Group show={true}>
      <View className="h-28 w-16 justify-center gap-2">
        <Skeleton colorMode={theme}>
          <View className="size-16 items-center justify-center rounded-2xl">
            <Star size={32} />
          </View>
        </Skeleton>
        <Skeleton colorMode={theme} height={20}>
          <View className="flex-1 justify-center">
            <Typography size="sm">Placeholder</Typography>
          </View>
        </Skeleton>
      </View>
    </Skeleton.Group>
  );
};
