// import { PageLoading } from "@/components/page/loading";
// import { PageContainer } from "@/components/primitives/container";
// import { Header } from "@/features/layout/header";
// import { Filters } from "@/features/posts/filters";
// import { Post } from "@/features/posts/post";
// import { Search } from "@/features/posts/search";
// import { useModalRouter } from "@/hooks/useModalRouter";
// import { useFilters } from "@/queries/posts/filters.query";
// import { usePosts } from "@/queries/posts/posts.query";
// import { useState } from "react";
// import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";

// export default function AnnouncementsPage() {
//   const [selectedId, setSelectedId] = useState(1);
//   const [searchPhrase, setSearchPhrase] = useState("");

//   const { data, isLoading, error, size, setSize, isRefreshing, handleRefresh } =
//     usePosts(selectedId, searchPhrase);

//   const { data: filters } = useFilters();

//   const modalRouter = useModalRouter();

//   return (
//     <PageContainer>
//       <Header
//         title="Publications"
//         rightIcon="settings"
//         leftIcon="inside-psbs"
//       />
//       <View className="mb-4 gap-5">
//         <Search searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />
//         <Filters
//           data={filters}
//           selectedId={selectedId}
//           setSelectedId={setSelectedId}
//         />
//       </View>
//       {!data || isLoading ? (
//         <PageLoading />
//       ) : (
//         <>
//           <FlatList
//             data={data}
//             contentContainerClassName="gap-4"
//             showsVerticalScrollIndicator={false}
//             debug={true}
//             refreshControl={
//               <RefreshControl
//                 refreshing={isRefreshing}
//                 onRefresh={handleRefresh}
//               />
//             }
//             onEndReached={() => {
//               const length = data.length - 1;
//               if (
//                 data[length]?.meta.last_page &&
//                 data[length].meta.last_page >= size
//               )
//                 setSize(size + 1);
//             }}
//             onEndReachedThreshold={3}
//             renderItem={({ item }) => (
//               <View className="gap-4">
//                 {item?.data.map((item) => (
//                   <TouchableOpacity
//                     key={item.id}
//                     onPress={() => modalRouter.open(`/post/${item.id}`)}
//                   >
//                     <Post
//                       item={item}
//                       isLoading={isLoading}
//                       error={error}
//                       postId={item.id}
//                       handleRefresh={handleRefresh}
//                     />
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             )}
//           />
//         </>
//       )}
//     </PageContainer>
//   );
// }

import { useAuth } from "@/auth/useAuth";
import { PageContainer } from "@/components/primitives/container";
import { Post } from "@/features/posts/post";
import { useModalRouter } from "@/hooks/useModalRouter";
import type { PostsData } from "@/schemas/posts/post.schema";
import { PostsSchema } from "@/schemas/posts/post.schema";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import useSWRInfinite from "swr/infinite";
import { z } from "zod";

const fetcher = async (url: string, token: string) => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const parsedData = PostsSchema.safeParse(data);
    return parsedData.data?.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.map((e) => ({ path: e.path, message: e.message }));
      console.error(error);
    }
    console.error(error);
  }
};

const InfiniteScrollList = () => {
  const getKey = (
    pageIndex: number,
    previousPageData: PostsData["data"] | undefined
  ) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${process.env.EXPO_PUBLIC_API_URL}/api/post?per_page=10&page=${
      pageIndex + 1
    }`;
  };

  const modalRouter = useModalRouter();
  const { token } = useAuth();

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    (url) => fetcher(url, token || ""),
    {
      initialSize: 2,
    }
  );

  // Flatten the data array
  const items = data ? data.flat() : [];

  const loadMore = () => {
    setSize(size + 1);
  };

  return (
    <PageContainer>
      <FlatList
        data={items}
        keyExtractor={(item) => item?.id.toString() || ""}
        contentContainerClassName="gap-4"
        // debug
        renderItem={({ item }) => (
          <View className="gap-4">
            <TouchableOpacity
              onPress={() => modalRouter.open(`/post/${item?.id}`)}
            >
              <Post
                item={item}
                isLoading={isValidating}
                error={error}
                postId={item?.id}
              />
            </TouchableOpacity>
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
        ListFooterComponent={() =>
          isValidating ? <ActivityIndicator /> : null
        }
        initialNumToRender={10} // Adjust as needed
        maxToRenderPerBatch={100} // Adjust as needed
        windowSize={21} // Adjust as needed
      />
    </PageContainer>
  );
};

export default InfiniteScrollList;
