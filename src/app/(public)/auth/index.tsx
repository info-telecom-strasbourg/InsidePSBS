import { PrimaryButton, SettingsButton } from "@/components/Buttons";
import { BackButtonTopbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";
import { useRouter } from "expo-router";

const Auth = () => {
  const router = useRouter();
  return (
    <ScrollScreenView>
      <BackButtonTopbar rightIcon={<SettingsButton />}>Auth</BackButtonTopbar>
      <PrimaryButton onPress={() => router.push("/auth/login")}>
        Login
      </PrimaryButton>
    </ScrollScreenView>
  );
};

export default Auth;
