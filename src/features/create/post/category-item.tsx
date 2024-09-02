import { Typography } from "@/components/primitives/typography";
import type { UpdatePostInfoType } from "@/contexts/create-post.context";
import type { CategoriesData } from "@/schemas/post/categories.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Skeleton } from "moti/skeleton";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export const CategoryItem = ({
  item,
  categoriesSelected,
  updatePostCategories,
}: {
  item: CategoriesData["data"][0];
  categoriesSelected: number[] | null;
  updatePostCategories: UpdatePostInfoType;
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(
    categoriesSelected?.includes(item.id) || false
  );

  const { theme } = useTheme();

  return (
    <TouchableOpacity
      className="rounded-full px-4 py-1"
      style={{
        borderColor: item.color,
        borderWidth: 1,
        backgroundColor: isSelected ? item.color : colors[theme].background,
      }}
      onPress={() => {
        if (isSelected) {
          const elementToRemove = categoriesSelected?.findIndex(
            (i) => i === item.id
          );
          updatePostCategories(
            "categories",
            categoriesSelected?.filter(
              (_, index) => index !== elementToRemove
            ) || []
          );
        } else
          updatePostCategories("categories", [
            ...(categoriesSelected || []),
            item.id,
          ]);
        setIsSelected(!isSelected);
      }}
      disabled={categoriesSelected!.length >= 3 && !isSelected}
    >
      <Typography
        size="p"
        className={isSelected ? "text-white" : colors[theme].foreground}
      >
        {item.emoji} {item.name}
      </Typography>
    </TouchableOpacity>
  );
};

export const SkeletonCategoryItem = () => {
  const { theme } = useTheme();
  return (
    <Skeleton colorMode={theme}>
      <View className="rounded-full px-4 py-1">
        <Typography size="p">📘 Admis 2024</Typography>
      </View>
    </Skeleton>
  );
};
