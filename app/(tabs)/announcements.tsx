import { PageContainer } from "@/components/primitives/container";
import { Input } from "@/components/primitives/input";
import { Header } from "@/features/layout/header";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { Search } from "lucide-react-native";
import { ScrollView } from "react-native";

const AnnouncementsScreen = () => {
  const { theme } = useTheme();
  return (
    <PageContainer>
      <Header title="Annonces" rightIcon="settings" />
      <ScrollView>
        <Search strokeWidth={1.5} color={colors[theme].mutedForeground} />
        <Input placeholder="Rechercher"></Input>
      </ScrollView>
    </PageContainer>
  );
};

export default AnnouncementsScreen;
