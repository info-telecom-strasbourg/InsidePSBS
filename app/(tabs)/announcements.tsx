import { useAuth } from "@/auth/useAuth";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useFetch } from "@/hooks/useFetch";
import type { PostData } from "@/schemas/post.schema";
import { PostSchema } from "@/schemas/post.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { cn } from "@/utils/cn";
import { router } from "expo-router";
import { Heart, MessageCircle, Search } from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const HeadComp = () => {
  const { theme } = useTheme();

  const [searchPhrase, setSearchPhrase] = useState("");
  return (
    <View>
      <Header title="Annonces" leftIcon="inside-psbs" rightIcon="settings" />
      <View className="mb-6 flex-row items-center justify-start gap-3 rounded-2xl bg-popover p-2">
        <Search strokeWidth={1.5} color={colors[theme].foreground} size={24} />
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

const OnePost = ({ item }: { item: PostData["data"][0] }) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const { theme } = useTheme();
  return (
    <View className="justify-between rounded-2xl bg-popover p-4">
      <View className="flex-row items-center justify-start">
        <Image
          source={{ uri: item.author.logo_url || undefined }}
          className="size-20"
        />
        <View className="ml-2 flex-col">
          <Typography size="h4" fontWeight="semibold">
            {item.author.name}
          </Typography>
          <Typography
            size="h5"
            fontWeight="medium"
            className="text-muted-foreground"
          >
            {item.date}
          </Typography>
        </View>
      </View>
      <Typography size="h5">{item.body}</Typography>
      <View className="mt-3 flex-row items-center gap-4">
        <TouchableOpacity
          className="p-1"
          onPress={() => {
            setHeartClicked(!heartClicked);
          }}
        >
          <Heart
            strokeWidth={1.5}
            color={heartClicked ? colors.red : colors[theme].foreground}
            size={24}
            fill={heartClicked ? colors.red : colors[theme].popover}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/(comments)/[query]");
          }}
        >
          <MessageCircle
            strokeWidth={1.5}
            color={colors[theme].foreground}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Posts = () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post?per_page=4&page=1`;
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
      contentContainerClassName="justify-between gap-3"
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <OnePost item={item} />}
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
