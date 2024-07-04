import { PageError } from "@/components/page/error";
import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useCGU } from "@/queries/cgu.query";
import { View } from "react-native";

export default function CguPage() {
  const { data, error, isLoading, handleRefresh, isRefreshing } = useCGU();

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
