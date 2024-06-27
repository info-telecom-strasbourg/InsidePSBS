import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useFetch } from "@/hooks/useFetch";
import { FouailleSchema } from "@/schemas/fouaille.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Nfc } from "lucide-react-native";
import { View } from "react-native";

const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const parsedData = FouailleSchema.safeParse(data);
  if (!parsedData.success) {
    parsedData.error.issues.map((issue) => {
      console.error(`${issue.message} -- ON -- ${issue.path}`);
    });
  }
  return parsedData.data;
};

export default function FouaillePage() {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille`;
  const { token } = useAuth();
  const { theme } = useTheme();

  const { data, isLoading, error, isRefreshing, handleRefresh } = useFetch(
    url,
    (url: string) => fetcher(url, token || "")
  );

  return (
    <PageContainer>
      <Header title="Fouaille" rightIcon="close" />
      {!data?.data || isLoading ? (
        <PageLoading />
      ) : (
        <RefreshView
          isRefreshing={isRefreshing}
          handleRefresh={handleRefresh}
          contentContainerClassName="items-center justify-center"
        >
          <View className="m-4 flex-1 flex-row items-center justify-between rounded-2xl border border-muted-foreground bg-popover p-10">
            <View className="flex-1 gap-4">
              <Typography size="h4" className="text-muted-foreground">
                Carte Fouaille
              </Typography>
              <Typography size="h1" fontWeight="bold">
                {data.data.balance}€
              </Typography>
              <Typography size="h3" fontWeight="semibold">
                {`${data.data.first_name} ${data.data.last_name}`}
              </Typography>
            </View>
            <View>
              <Nfc className="size-24" color={colors[theme].foreground} />
            </View>
          </View>
        </RefreshView>
      )}
    </PageContainer>
  );
}
