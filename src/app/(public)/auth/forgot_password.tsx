import { PrimaryButton, SettingsButton } from "@/components/Buttons";
import { BackButtonTopbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";
import { useRouter } from "expo-router";

const ForgotPassword = () => {
  const router = useRouter();
  return (
    <ScrollScreenView>
      <BackButtonTopbar rightIcon={<SettingsButton />}>
        Forgot Password
      </BackButtonTopbar>
      <PrimaryButton onPress={() => router.push("/cgu")}>CGU</PrimaryButton>
    </ScrollScreenView>
  );
};

export default ForgotPassword;
