import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { routes } from "@/constants/routes";
import { Header } from "@/features/layout/header";
import { Search } from "@/features/posts/search";
import { useFetch } from "@/hooks/useFetch";
import { AssociationSchema } from "@/schemas/assos.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Image, TouchableOpacity, View } from "react-native";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  const parsedData = AssociationSchema.safeParse(data.data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }
  return parsedData.data;
};

export default function AssociationsPage() {
  const url = "https://fouaille.bde-tps.fr/api/organization";
  const { theme } = useTheme();
  const router = useRouter();

  const { data, isLoading, error, isRefreshing, handleRefresh } = useFetch(
    url,
    (url: string) => fetcher(url)
  );

  return isLoading ? (
    <>
      <Header title="Clubs et Associations" rightIcon="close" />
      <PageLoading />
    </>
  ) : (
    <PageContainer className="bg-background">
      <Header title="Clubs et Associations" rightIcon="close" />

      <RefreshView
        isRefreshing={isRefreshing}
        handleRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        className="p-2"
      >
        <Search />

        <View className="gap-3">
          <Typography
            size="h3"
            className="mt-4 text-foreground"
            fontWeight="semibold"
          >
            Associations
          </Typography>
          {data?.associations.map((item) => (
            <TouchableOpacity
              onPress={() => router.push(`${routes.organizations}/${item.id}`)}
              key={item.id}
              className="flex-1 flex-row items-center justify-start gap-3 rounded-2xl bg-popover p-3"
            >
              <Image
                source={{ uri: `${item.logo_url}` }}
                resizeMode="contain"
                className="size-16 rounded-2xl"
              />
              <View>
                <Typography
                  className="text-foreground"
                  size="h4"
                  fontWeight="medium"
                >
                  {item.short_name}
                </Typography>
                <Typography className="text-muted-foreground" size="p">
                  {item.name}
                </Typography>
              </View>

              <View className="absolute right-3">
                <ChevronRight size={25} color={colors[theme].foreground} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View className="gap-3">
          <Typography
            size="h3"
            className="mt-4 text-foreground"
            fontWeight="semibold"
          >
            Clubs
          </Typography>
          {data?.clubs.map((item) => (
            <TouchableOpacity
              onPress={() => router.push(`${routes.organizations}/${item.id}`)}
              key={item.id}
              className="flex-1 flex-row items-center justify-start gap-3 rounded-2xl bg-popover p-3"
            >
              <Image
                source={{ uri: `${item.logo_url}` }}
                resizeMode="contain"
                className="size-16 rounded-2xl"
              />
              <View>
                <Typography
                  className="text-foreground"
                  size="h4"
                  fontWeight="medium"
                >
                  {item.short_name}
                </Typography>
                <Typography className="text-muted-foreground" size="h5">
                  {item.name}
                </Typography>
              </View>

              <View className="absolute right-3">
                <ChevronRight size={25} color={colors[theme].foreground} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </RefreshView>
    </PageContainer>
  );
}
