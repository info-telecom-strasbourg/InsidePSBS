import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Typography } from "@/components/primitives/typography";
import { Event } from "@/features/calendar/event";
import { GridCards } from "@/features/home/grid-cards";
import { Post } from "@/features/post/post";
import { useFetch } from "@/hooks/useFetch";
import { useModalRouter } from "@/hooks/useModalRouter";
import { useEvents } from "@/queries/calendar/event.query";
import { useCards } from "@/queries/home/cards.query";
import { postsFetcher } from "@/queries/post/posts.query";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { ChevronDown } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function HomePage() {
  const { theme } = useTheme();
  const { token } = useAuth();
  const {
    data: cardsData,
    isLoading: cardsIsLoading,
    handleRefresh,
    isRefreshing,
  } = useCards();

  const { data: eventsData, isLoading: eventsAreLoading } = useEvents();
  const modalRouter = useModalRouter();

  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post?per_page=3`;
  const { data: news, isLoading: postIsLoading } = useFetch(
    url,
    (url: string) => postsFetcher(url, token || "")
  );

  return (
    <PageContainer className="bg-background">
      <Header title="InsidePSBS" leftIcon="inside-psbs" rightIcon="settings" />
      <RefreshView
        className="flex-1"
        handleRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        showsVerticalScrollIndicator={false}
      >
        {!cardsData || cardsIsLoading ? (
          <PageLoading />
        ) : (
          <GridCards data={cardsData} isLoading={cardsIsLoading} />
        )}
        <TouchableOpacity className="mb-4 flex-row items-center gap-4">
          <Typography size="h1" fontWeight="bold">
            Évènements à venir
          </Typography>
          <ChevronDown size={24} color={colors[theme].foreground} />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {eventsData?.map((item, index) => (
            <View key={index} className="mr-3 flex-1">
              <Event item={item} />
            </View>
          ))}
        </ScrollView>
        <Typography size="h1" fontWeight="bold" className="mb-4">
          Actualités
        </Typography>
        <View className="mb-4">
          {news?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => modalRouter.open(`/post/${item?.id}`)}
              className="mb-4"
            >
              <Post item={item} postId={item.id} />
            </TouchableOpacity>
          ))}
        </View>
      </RefreshView>
    </PageContainer>
  );
}
