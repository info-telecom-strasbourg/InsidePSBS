import { SettingsButton } from "@/components/Buttons";
import { BackButtonTopbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

const Credits = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ animation: "slide_from_right" });
  }, [navigation]);
  return (
    <ScrollScreenView>
      <BackButtonTopbar rightIcon={<SettingsButton />}>
        Credits
      </BackButtonTopbar>
    </ScrollScreenView>
  );
};

export default Credits;
