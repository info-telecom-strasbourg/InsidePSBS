import { Stack } from "expo-router";

const CommentsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[query]" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default CommentsLayout;
