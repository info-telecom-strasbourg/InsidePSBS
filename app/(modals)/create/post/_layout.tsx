import { PageContainer } from "@/components/primitives/container";
import { Header } from "@/components/primitives/header";
import { CreatePostProvider } from "@/contexts/create-post.context";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";

export default function RouteLayout() {
  const { theme } = useTheme();
  return (
    <BottomSheetModalProvider>
      <CreatePostProvider>
        <PageContainer>
          <Header title="Publier un post" rightIcon="close" leftIcon="back" />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
              contentStyle: { backgroundColor: colors[theme].background },
            }}
          />
        </PageContainer>
      </CreatePostProvider>
    </BottomSheetModalProvider>
  );
}
