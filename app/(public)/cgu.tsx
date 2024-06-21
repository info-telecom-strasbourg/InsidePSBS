import { PageError } from "@/components/page/error";
import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useFetch } from "@/hooks/useFetch";
import { CguSchema, type CguData } from "@/schemas/cgu.schema";
import { View } from "react-native";

const fetcher = async (url: string): Promise<CguData> => {
  const res = await fetch(url);
  const data = await res.json();
  return CguSchema.parse(data);
};

const url = `${process.env.EXPO_PUBLIC_API_URL}/api/cgu`;

export default function CguPage() {
  const { data, error, isLoading, handleRefresh, isRefreshing } = useFetch(
    url,
    fetcher
  );

  return (
    <PageContainer>
      <Header rightIcon="close" leftIcon="inside-psbs" title="CGU" />
      <RefreshView
        handleRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-1 items-center justify-center">
          {isLoading && <PageLoading />}
          {error ? (
            <PageError />
          ) : (
            <View className="flex flex-col gap-10 py-5">
              {data?.sections?.map((section, index) => (
                <View key={index}>
                  <Typography size="h4" fontWeight="bold" className="mb-2">
                    {section.title}
                  </Typography>
                  <Typography size="p">{section.content}</Typography>
                </View>
              ))}
            </View>
          )}
        </View>
      </RefreshView>
    </PageContainer>
  );
}
