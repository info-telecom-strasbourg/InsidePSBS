import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/features/layout/header";

export default function RoutePage() {
  return (
    <PageContainer>
      <Header title="Dev" leftIcon="inside-psbs" rightIcon="close" />
    </PageContainer>
  );
}
