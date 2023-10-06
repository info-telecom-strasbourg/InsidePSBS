import { SettingsButton } from "@/components/Buttons";
import { BackButtonTopbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";

const Fouaille = () => {
  return (
    <ScrollScreenView>
      <BackButtonTopbar rightIcon={<SettingsButton />}>
        Fouaille
      </BackButtonTopbar>
    </ScrollScreenView>
  );
};

export default Fouaille;
