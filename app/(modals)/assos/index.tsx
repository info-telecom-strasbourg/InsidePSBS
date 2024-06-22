import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useFetch } from "@/hooks/useFetch";
import { AssociationSchema } from "@/schemas/assos.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { FlatList, Image, TouchableOpacity } from "react-native";

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
  return data.data;
};

export default function AssociationsPage() {
  const url = "https://fouaille.bde-tps.fr/api/organization";
  const { theme } = useTheme();
  const router = useRouter();

  const { data } = useFetch(url, fetcher);

  return (
    <PageContainer className="bg-background">
      <Header title="Clubs et Associations" rightIcon="close" />
      <Typography
        size="h3"
        className="mb-3 text-foreground"
        fontWeight="semibold"
      >
        Associations
      </Typography>
      <FlatList
        data={data?.associations}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperClassName="justify-between gap-3 mb-3"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => router.push(`/assos/${item.id}`)}
              key={item.id}
              className="flex-1 flex-row items-center justify-center gap-5 rounded-2xl bg-popover p-3"
            >
              <Image
                source={{ uri: `${item.logo_url}` }}
                resizeMode="contain"
                className="size-20 rounded-2xl"
              />
              <Typography
                className="text-foreground"
                size="h4"
                fontWeight="medium"
              >
                {item.short_name}
              </Typography>
              <ChevronRight size={25} color={colors[theme].foreground} />
            </TouchableOpacity>
          );
        }}
      />
    </PageContainer>
  );
}
