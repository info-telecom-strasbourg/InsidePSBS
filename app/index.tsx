import { useAuth } from "@/auth/useAuth";
import { Redirect } from "expo-router";

const Index = () => {
  const { isAuthenticated } = useAuth();
  // return isAuthenticated ? <Redirect href="/dev" /> : <Redirect href="/home" />;
  return <Redirect href="/auth" />;
};

export default Index;
