import { ScreenContainer } from "components/Containers";
import ROUTES from "constants/routes";
import { Redirect, useRootNavigationState } from "expo-router";

const Page = () => {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return (
    <ScreenContainer>
      <Redirect href={ROUTES.home} />
    </ScreenContainer>
  );
};

export default Page;
