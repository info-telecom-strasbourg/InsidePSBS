import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { Identity } from "@/features/organizations/identity";
import { Socials } from "@/features/organizations/socials";
import { useFetch } from "@/hooks/useFetch";
import { ShowOrganizationItemSchema } from "@/schemas/assos.schema";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  // console.log(data);
  const parsedData = ShowOrganizationItemSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data;
};

export default function AssoIdPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/organization/${id}`;
  const { token } = useAuth();

  const { data, isLoading, isRefreshing, handleRefresh } = useFetch(
    url,
    (url: string) => fetcher(url, token || "")
  );

  return (
    <PageContainer>
      <Header title="Profil" leftIcon="back" rightIcon="close" />
      {!data || isLoading ? (
        <PageLoading />
      ) : (
        <RefreshView
          scrollEnabled={false}
          isRefreshing={isRefreshing}
          handleRefresh={handleRefresh}
        >
          <View className="gap-5 p-2">
            <Identity data={data.organization} />
            <Typography
              size="p"
              fontWeight="medium"
              className=" text-foreground"
            >
              {data.organization.description}
            </Typography>
            <Socials data={data} className="bg-blue" />
            {/* <Members data={data} /> */}
          </View>
        </RefreshView>
      )}
    </PageContainer>
  );
}
