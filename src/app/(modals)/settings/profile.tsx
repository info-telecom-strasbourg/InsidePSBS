import { PrimaryButton, SettingsButton } from "@/components/Buttons";
import { BackButtonTopbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";
import { logout } from "@/utils/auth";

const Profile = () => {
  return (
    <ScrollScreenView>
      <BackButtonTopbar rightIcon={<SettingsButton />}>
        Profile
      </BackButtonTopbar>
      <PrimaryButton onPress={async () => logout()}>Logout</PrimaryButton>
    </ScrollScreenView>
  );
};

export default Profile;
