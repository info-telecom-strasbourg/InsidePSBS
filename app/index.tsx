import { ScreenContainer } from "components/Containers";
import { useRootNavigationState } from "expo-router";
import { Text } from "react-native";

const Page = () => {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return (
    <ScreenContainer>
      {/* <Redirect href={ROUTES.home} /> */}
      <Text>Home</Text>
    </ScreenContainer>
  );
};

export default Page;
