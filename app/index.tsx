import { Redirect } from "expo-router";

export default function Index() {
  // const { isAuthenticated } = useAuth();
  // return isAuthenticated ? <Redirect href="/dev" /> : <Redirect href="/home" />;
  return <Redirect href="/auth" />;
}
