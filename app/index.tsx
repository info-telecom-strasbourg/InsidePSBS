import ScreenContainer from "components/screencontainer/ScreenContainer";
import { Redirect, useRootNavigationState } from "expo-router";

import ROUTES from "../constants/routes";
export default function Page() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return (
    <ScreenContainer>
      <Redirect href={ROUTES.home} />
    </ScreenContainer>
  );
}
