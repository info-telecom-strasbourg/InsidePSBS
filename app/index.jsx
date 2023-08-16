import { ROUTES } from "../constants";
import { Redirect, useRootNavigationState } from "expo-router";
import { ScreenContainer } from "../components";

export default function Page() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return (
    <ScreenContainer>
      <Redirect href={ROUTES.home} />
    </ScreenContainer>
  );
}
