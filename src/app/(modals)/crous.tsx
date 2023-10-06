import { SettingsButton } from "@/components/Buttons";
import { BackButtonTopbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";

const Crous = () => {
  return (
    <ScrollScreenView>
      <BackButtonTopbar rightIcon={<SettingsButton />}>Crous</BackButtonTopbar>
    </ScrollScreenView>
  );
};

export default Crous;
