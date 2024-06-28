import { useAuth } from "@/auth/useAuth";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { Post } from "../posts/post";

const getKey = (pageIndex: number) => {
  return `${process.env.EXPO_PUBLIC_API_URL}/api/user/me?per_page=10&page=${
    pageIndex + 1
  }`;
};

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = ItsMeUserSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data;
};

export const useProfilePosts = () => {
  const { token } = useAuth();

  const res = useFetchInfinite(
    (pageIndex) => getKey(pageIndex),
    (url: string) => fetcher(url, token || "")
  );
  return res;
};

const ProfilePosts = () => {
  return (
    <View>
      <FlatList
        data={data}
        contentContainerClassName="gap-4"
        showsVerticalScrollIndicator={false}
        ListFooterComponentClassName="mb-4"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        onEndReached={() => setSize(size + 1)}
        onEndReachedThreshold={0.4}
        renderItem={({ item }) => (
          <View className="gap-4">
            {item.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => modalRouter.open(`/post/${item.id}`)}
              >
                <Post
                  item={item}
                  interactions
                  isLoading={isLoading}
                  error={error}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default ProfilePosts;
