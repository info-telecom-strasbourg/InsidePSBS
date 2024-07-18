import { PageContainer } from "@/components/primitives/container";
import { CreatePostProvider } from "@/contexts/create-post.context";
import { Header } from "@/features/layout/header";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";

export default function RouteLayout() {
  return (
    <BottomSheetModalProvider>
      <CreatePostProvider>
        <PageContainer>
          <Header title="Publier un post" rightIcon="close" leftIcon="back" />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
        </PageContainer>
      </CreatePostProvider>
    </BottomSheetModalProvider>
  );
}
