import { Redirect } from "expo-router";

import { ROUTES } from "../constants";

export default function Page() {
  return <Redirect href={ROUTES.home} />;
}
