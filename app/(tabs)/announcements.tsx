import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Search } from "lucide-react-native";
import { FlatList, ScrollView, View } from "react-native";

const AnnouncementsScreen = () => {
  const { theme } = useTheme();

  const filters = [
    { id: 0, name: "Tout" },
    {
      id: 1,
      name: "Admis 2023",
    },
    {
      id: 2,
      name: "Admis 2024",
    },
    {
      id: 3,
      name: "Neurchi",
    },
    {
      id: 4,
      name: "Boîte tactique",
    },
    {
      id: 5,
      name: "Objets Perdus",
    },
    {
      id: 6,
      name: "Clubs et Assos",
    },
  ];
  return (
    <PageContainer className="bg-background">
      <Header title="Annonces" leftIcon="inside-psbs" rightIcon="settings" />
      <ScrollView className="mt-2">
        <Search strokeWidth={1.5} color={colors[theme].foreground} size={32} />
        <View className="items-center justify-between rounded-2xl bg-popover p-3">
          <FlatList
            data={filters}
            renderItem={({ item }) => (
              <Typography size="h5">{item.name}</Typography>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default AnnouncementsScreen;
