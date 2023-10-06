import { SettingsButton } from "@/components/Buttons";
import { BackButtonTopbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";

const Credits = () => {
  return (
    <ScrollScreenView>
      <BackButtonTopbar rightIcon={<SettingsButton />}>
        Credits
      </BackButtonTopbar>
    </ScrollScreenView>
  );
};

export default Credits;
