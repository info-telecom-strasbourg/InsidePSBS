import { PrimaryButton, SettingsButton } from "@/components/Buttons";
import { DefaultTopbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  return (
    <ScrollScreenView>
      <DefaultTopbar rightIcon={<SettingsButton />}>Home</DefaultTopbar>
      <PrimaryButton onPress={() => router.push("/fouaille")}>
        Fouaille
      </PrimaryButton>
    </ScrollScreenView>
  );
};

export default Home;
