import type { Href } from "expo-router";
import { Redirect } from "expo-router";

export default function SignUpPage() {
  return <Redirect href={"auth/sign-up/step-1" as Href} />;
}
