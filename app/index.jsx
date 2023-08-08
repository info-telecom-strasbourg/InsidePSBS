import { ROUTES } from "../constants";
import { Redirect } from "expo-router";
import { ScreenContainer } from "../components";

export default function Page() {
  return (
    <ScreenContainer>
      <Redirect href={ROUTES.home} />
    </ScreenContainer>
  );
}
