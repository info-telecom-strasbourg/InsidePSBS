import { Typography } from "@/components/primitives/typography";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

const filters = [
  { id: 0, name: "Tout" },
  { id: 1, name: "Admis 2023" },
  { id: 2, name: "Admis 2024" },
  { id: 3, name: "Neurchi" },
  { id: 4, name: "Boîte tactique" },
  { id: 5, name: "Objets Perdus" },
  { id: 6, name: "Clubs et Assos" },
];

export const Filters = () => {
  const [selectedId, setSelectedId] = useState(0);

  return (
    <View className="flex-row items-center truncate rounded-full bg-popover">
      <FlatList
        data={filters}
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
            onPress={() => setSelectedId(item.id)}
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
