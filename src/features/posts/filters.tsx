import { useAuth } from "@/auth/useAuth";
import { Typography } from "@/components/primitives/typography";
import { useFetch } from "@/hooks/useFetch";
import { CategoriesSchema } from "@/schemas/categories.schema";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

const fetcher = async (url: string, token: string | null) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = CategoriesSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }
  return parsedData.data.data;
};

// export const postsURL = `${process.env.EXPO_PUBLIC_API_URL}/api/post?category_id=${selectedId}`;

export const Filters = () => {
  const [selectedId, setSelectedId] = useState(1);
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/categories`;

  const { token } = useAuth();
  const { data: filters } = useFetch(url, (url: string) => fetcher(url, token));

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
