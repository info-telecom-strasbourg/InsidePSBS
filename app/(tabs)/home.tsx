import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import GridCards from "@/features/home/grid-cards";
import { Header } from "@/features/layout/header";
import { ScrollView, View } from "react-native";

const HomeScreen = () => {
  return (
    <PageContainer className="bg-background">
      <ScrollView>
        <Header
          title="InsidePSBS"
          leftIcon="inside-psbs"
          rightIcon="settings"
        />
        <GridCards />
        <View>
          <Typography size="h1" fontWeight="bold">
            Actualités
          </Typography>
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default HomeScreen;
