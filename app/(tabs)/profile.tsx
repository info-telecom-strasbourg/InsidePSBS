import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";

export default function ProfilePage() {
  return (
    <PageContainer>
      <Header title="Profile" rightIcon="settings" />
    </PageContainer>
  );
}
