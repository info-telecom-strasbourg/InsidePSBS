import {
  PrimaryButton,
  SecondaryButton,
  SettingsButton,
} from "@/components/Buttons";
import { BackButtonTopbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";
import { login } from "@/utils/auth";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  return (
    <ScrollScreenView>
      <BackButtonTopbar rightIcon={<SettingsButton />}>Logins</BackButtonTopbar>
      <PrimaryButton onPress={() => router.push("/auth/forgot_password")}>
        Forgot Password
      </PrimaryButton>
      <SecondaryButton onPress={async () => login(() => router.push("/home"))}>
        Login
      </SecondaryButton>
    </ScrollScreenView>
  );
};

export default Login;
