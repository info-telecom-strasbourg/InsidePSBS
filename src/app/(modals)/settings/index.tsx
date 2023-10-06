import { PrimaryButton, SettingsButton } from "@/components/Buttons";
import { BackButtonTopbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";
import { useRouter } from "expo-router";

const Settings = () => {
  const router = useRouter();
  return (
    <ScrollScreenView>
      <BackButtonTopbar rightIcon={<SettingsButton />}>
        Settings
      </BackButtonTopbar>
      <PrimaryButton
        onPress={() => router.push("/settings/credits")}
      ></PrimaryButton>
    </ScrollScreenView>
  );
};

export default Settings;
