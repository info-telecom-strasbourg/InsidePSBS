import { useAuth } from "@/auth/useAuth";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import SinglePost from "@/features/posts/single-post";
import { useFetch } from "@/hooks/useFetch";
import { PostsSchema } from "@/schemas/post.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import { router } from "expo-router";
import { Search } from "lucide-react-native";
import { useState } from "react";
import { FlatList, TextInput, TouchableOpacity, View } from "react-native";

const HeadComp = () => {
  const { theme } = useTheme();

  const [searchPhrase, setSearchPhrase] = useState("");
  return (
    <View>
      <Header title="Annonces" leftIcon="inside-psbs" rightIcon="settings" />
      <View className="mb-6 flex-row items-center justify-start gap-3 rounded-2xl bg-popover p-2 pl-4">
        <Search
          strokeWidth={1.5}
          color={colors[theme].mutedForeground}
          size={24}
        />
        <TextInput
          value={searchPhrase}
          onChangeText={(searchPhrase) => setSearchPhrase(searchPhrase)}
          className="flex-1 rounded-2xl p-2 text-foreground"
          placeholder="Rechercher des posts"
          placeholderTextColor={colors[theme].mutedForeground}
          style={{ fontFamily: "SpaceGrotesk-medium" }}
        />
      </View>
      <Filters />
    </View>
  );
};

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
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post?per_page=10&page=1`;
  const { token } = useAuth();

  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const parsedData = PostsSchema.safeParse(data);
    if (!parsedData.success) {
      throw new Error(parsedData.error.message);
    }
    return data.data;
  };
  const { data } = useFetch(url, fetcher);

  return (
    <FlatList
      data={data}
      contentContainerClassName="justify-between gap-3"
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => router.push(`/post/${item.id}`)}>
          <SinglePost item={item} interactions />
        </TouchableOpacity>
      )}
      ListHeaderComponent={HeadComp}
    />
  );
};

const AnnouncementsScreen = () => {
  return (
    <PageContainer className="bg-background">
      <Posts />
    </PageContainer>
  );
};

export default AnnouncementsScreen;
