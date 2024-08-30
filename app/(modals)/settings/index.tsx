import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { ScrollView } from "react-native";

export default function SettingsPage() {
  return (
    <PageContainer>
      <Header title="Settings" rightIcon="close" />
      <ScrollView></ScrollView>
    </PageContainer>
  );
}
