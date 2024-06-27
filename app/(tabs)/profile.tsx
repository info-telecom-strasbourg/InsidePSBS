import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useFetch } from "@/hooks/useFetch";
import { ItsMeUserSchema } from "@/schemas/user.schema";
import { Image, View } from "react-native";

const fetcher = async (url: string, token: string | null) => {
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

export default function ProfilePage(myProfile: boolean = true) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/user/me`;
  const { token } = useAuth();

  const { data, isRefreshing, handleRefresh, error, isLoading } = useFetch(
    url,
    (url: string) => fetcher(url, token || "")
  );
  return (
    <PageContainer>
      <Header
        title="Profile"
        rightIcon={myProfile ? "settings" : "close"}
        leftIcon={myProfile ? "inside-psbs" : "back"}
      />
      {!data || isLoading ? (
        <PageLoading />
      ) : (
        <View>
          <View className="flex-row items-center gap-4">
            <Image
              source={{ uri: data.data.avatar_url || undefined }}
              className="size-24"
            />
            <View className="justify-center gap-1">
              <Typography size="h2" fontWeight="semibold">
                {`${data.data.first_name} ${data.data.last_name}`}
              </Typography>
              <Typography size="h3" className="text-muted-foreground">
                {data.data.user_name}
              </Typography>
            </View>
          </View>
          <RefreshView
            isRefreshing={isRefreshing}
            handleRefresh={handleRefresh}
          ></RefreshView>
        </View>
      )}
    </PageContainer>
  );
}
