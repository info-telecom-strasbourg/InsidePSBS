import { useAuth } from "@/auth/useAuth";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useFetch } from "@/hooks/useFetch";
import { PostSchema } from "@/schemas/post.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import { Search } from "lucide-react-native";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

const Filters = () => {
  const [selectedId, setSelectedId] = useState(0);

  const filters = [
    { id: 0, name: "Tout" },
    {
      id: 1,
      name: "Admis 2023",
    },
    {
      id: 2,
      name: "Admis 2024",
    },
    {
      id: 3,
      name: "Neurchi",
    },
    {
      id: 4,
      name: "Boîte tactique",
    },
    {
      id: 5,
      name: "Objets Perdus",
    },
    {
      id: 6,
      name: "Clubs et Assos",
    },
  ];
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

const Posts = () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post`;
  const { token } = useAuth();

  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const parsedData = PostSchema.safeParse(data);
    if (!parsedData.success) {
      throw new Error(parsedData.error.message);
    }
    return data.data;
  };
  const { data } = useFetch(url, fetcher);

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return <Typography>{item.title}</Typography>;
      }}
    />
  );
};

const AnnouncementsScreen = () => {
  const { theme } = useTheme();

  return (
    <PageContainer className="bg-background">
      <Header title="Annonces" leftIcon="inside-psbs" rightIcon="settings" />
      <Search strokeWidth={1.5} color={colors[theme].foreground} size={32} />
      <Filters />
      <Posts />
    </PageContainer>
  );
};

export default AnnouncementsScreen;
