import { Typography } from "@/components/primitives/typography";
import type { UpdatePostInfoType } from "@/contexts/create-post.context";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import type { CategoriesData } from "@app/(tabs)/posts/_features/categories.schema";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export const CategoryItem = ({
  item,
  categoriesSelected,
  updatePostCategories,
}: {
  item: CategoriesData["data"][0];
  categoriesSelected: number[] | null;
  updatePostCategories: UpdatePostInfoType;
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

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
