import type { CategoriesData } from "@app/(tabs)/posts/_features/fetch/categories.schema";
import { Filters } from "@app/(tabs)/posts/_features/filters";
import { memo } from "react";
import { View } from "react-native";

export const PostsHeader = memo(function PostsHeader({
  filters,
  selectedId,
  setSelectedId,
}: {
  filters: CategoriesData["data"] | undefined;
  selectedId: number;
  setSelectedId: (selectedId: number) => void;
}) {
  return (
    <View className="mb-4 gap-5">
      <Filters
        data={filters}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </View>
  );
});
