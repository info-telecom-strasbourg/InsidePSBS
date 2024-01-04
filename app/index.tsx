import { ScreenContainer } from "components/Containers";
import { Loader } from "components/Loader";
import Text from "components/Text";
import ROUTES from "constants/routes";
import { useAuth } from "contexts/authContext";
import { Redirect, useRootNavigationState } from "expo-router";

const Page = () => {
  const rootNavigationState = useRootNavigationState();

  const { token, isLoading } = useAuth();

  if (isLoading)
    return (
      <ScreenContainer>
        <Loader />
      </ScreenContainer>
    );

  if (!token) return <Redirect href={ROUTES.auth} />;

  if (!rootNavigationState?.key) return null;

  return <Redirect href={ROUTES.home} />;
};

export default Page;
