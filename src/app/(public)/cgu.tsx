import { SettingsButton } from "@/components/Buttons";
import { BackButtonTopbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";

const CGU = () => {
  return (
    <ScrollScreenView>
      <BackButtonTopbar rightIcon={<SettingsButton />}>CGU</BackButtonTopbar>
    </ScrollScreenView>
  );
};

export default CGU;
