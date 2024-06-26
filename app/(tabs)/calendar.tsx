import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";

export default function CalendarPage() {
  return (
    <PageContainer>
      <Header title="Calendar" rightIcon="settings" leftIcon="inside-psbs" />
    </PageContainer>
  );
}
