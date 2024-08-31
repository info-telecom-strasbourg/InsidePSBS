import type { CategoriesData } from "@/schemas/post/categories.schema";
import { memo } from "react";
import { View } from "react-native";
import { Filters } from "./filters";

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
