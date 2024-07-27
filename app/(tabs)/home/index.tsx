import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { Typography } from "@/components/primitives/typography";
import { useFetch } from "@/hooks/useFetch";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useEvents } from "@app/(tabs)/calendar/_features/event.query";
import { useCards } from "@app/(tabs)/home/_features/cards.query";
import { GridCards } from "@app/(tabs)/home/_features/grid-cards";
import { Post } from "@app/(tabs)/posts/_features/post";
import { ChevronDown } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Event } from "../calendar/_features/event";
import { postsFetcher } from "../posts/_features/posts.query";

// type EventItem = EventsData["data"][0];

// export const Event = ({ item }: { item: EventItem | undefined }) => {
//   const modalRouter = useModalRouter();
//   const { theme } = useTheme();

//   return (
//     <>
//       {item ? (
//         <View
//           className="mb-6 mr-4 flex-row items-center justify-between gap-2 rounded-2xl bg-popover p-3"
//           style={{ width: 340 }}
//         >
//           <View
//             className="w-1 rounded-full"
//             style={{ backgroundColor: item.color }}
//           ></View>
//           <View>
//             <View className="w-full flex-row items-center justify-between gap-4 pr-6">
//               <View className="flex-row items-center gap-3">
//                 <TouchableOpacity
//                   onPress={() =>
//                     modalRouter.open(`/organizations/${item.author.id}`)
//                   }
//                 >
//                   <Image
//                     source={{ uri: item.author.logo_url || undefined }}
//                     className="size-14"
//                   />
//                 </TouchableOpacity>
//                 <Typography size="h5" fontWeight="semibold">
//                   {item.author.short_name}
//                 </Typography>
//               </View>
//               <Typography
//                 size="p"
//                 className="rounded-full px-3 py-1 text-white"
//                 style={{
//                   backgroundColor: item.color,
//                   fontFamily: "SpaceGrotesk-semibold",
//                 }}
//               >
//                 {capitalize(item.date_format.date)}
//               </Typography>
//             </View>
//             <View className="gap-3">
//               <Text
//                 style={{
//                   color: item.color,
//                   fontFamily: "SpaceGrotesk-semibold",
//                   fontSize: 22,
//                 }}
//               >
//                 {item.title}
//               </Text>
//               <View className="flex-row items-center gap-2">
//                 <Clock color={colors[theme].foreground} size={24} />
//                 <Typography>
//                   {item.date_format.start_at_simplified} -{" "}
//                   {item.date_format.end_at_simplified}
//                 </Typography>
//               </View>
//               <View className="w-full flex-row items-center justify-between">
//                 <View className="flex-row items-center gap-2">
//                   <MapPin color={colors[theme].foreground} size={24} />
//                   <Typography>{item.location}</Typography>
//                 </View>
//                 {item.post_id ? (
//                   <TouchableOpacity
//                     className="mr-6"
//                     onPress={() => modalRouter.open(`/post/${item.post_id}`)}
//                   >
//                     <Forward color={colors[theme].foreground} size={24} />
//                   </TouchableOpacity>
//                 ) : null}
//               </View>
//             </View>
//           </View>
//         </View>
//       ) : null}
//     </>
//   );
// };

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

  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/post?per_page=3`;
  const { data: news, isLoading: postIsLoading } = useFetch(
    url,
    (url: string) => postsFetcher(url, token || "")
  );

  return (
    <PageContainer className="bg-background">
      <Header
        title="InsidePSBS"
        leftIcon="inside-psbs"
        rightIcon="notifications"
      />
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
            <Event item={item} key={index} isLoading={eventsAreLoading} />
          ))}
        </ScrollView>
        <Typography size="h1" fontWeight="bold" className="mb-4">
          Actualités
        </Typography>
        <View className="mb-4 gap-4">
          {news?.map((item, index) => (
            <Post
              item={item}
              key={index}
              isLoading={postIsLoading}
              postId={item.id}
            />
          ))}
        </View>
      </RefreshView>
    </PageContainer>
  );
}
