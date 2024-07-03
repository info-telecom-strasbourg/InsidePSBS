import { Typography } from "@/components/primitives/typography";
import type { CategoriesData } from "@/schemas/posts/categories.schema";
import { cn } from "@/utils/cn";
import { FlatList, TouchableOpacity, View } from "react-native";

export type FiltersProps = {
  data: CategoriesData["data"] | undefined;
  selectedId: number;
  setSelectedId: (id: number) => void;
};

export const Filters = ({ data, selectedId, setSelectedId }: FiltersProps) => {
  return (
    <View className="flex-row items-center truncate rounded-full bg-popover">
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="rounded-full bg-popover p-1"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={cn(
              selectedId === item.id ? `bg-primary` : `bg-popover`,
              "mr-3 rounded-full p-2 pl-4 pr-4"
            )}
            onPress={() => {
              setSelectedId(item.id);
            }}
          >
            <Typography
              size="h5"
              className={
                selectedId === item.id ? `text-white` : `text-foreground`
              }
            >
              {item.name}
            </Typography>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
