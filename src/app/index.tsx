import {
  PrimaryButton,
  SecondaryButton,
  SettingsButton,
} from "@/components/Buttons";
import { Body1 } from "@/components/Text";
import { DefaultTopbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";
import { logout } from "@/utils/auth";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const AppIndex = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const { getItem: getToken } = useAsyncStorage("token");
  useEffect(() => {
    updateToken();
  }, []);

  const updateToken = async () => {
    setToken(await getToken());
  };

  return (
    <ScrollScreenView
      contentContainerStyle={{ gap: 10 }}
      onRefresh={updateToken}
    >
      <DefaultTopbar rightIcon={<SettingsButton />}>Index</DefaultTopbar>
      <Body1>{token || "not logged in"}</Body1>
      <PrimaryButton onPress={() => router.push("/home")}>Home</PrimaryButton>
      <PrimaryButton onPress={() => router.push("/settings/")}>
        Settings
      </PrimaryButton>
      <PrimaryButton onPress={() => router.push("/auth/login")}>
        Login
      </PrimaryButton>
      <PrimaryButton onPress={() => router.push("/auth/register")}>
        Register
      </PrimaryButton>
      <SecondaryButton onPress={async () => logout()}>Logout</SecondaryButton>
    </ScrollScreenView>
  );
};

export default AppIndex;
