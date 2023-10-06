import { SettingsButton } from "@/components/Buttons";
import { BackButtonTopbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";

const Register = () => {
  return (
    <ScrollScreenView>
      <BackButtonTopbar rightIcon={<SettingsButton />}>
        Register
      </BackButtonTopbar>
    </ScrollScreenView>
  );
};

export default Register;
