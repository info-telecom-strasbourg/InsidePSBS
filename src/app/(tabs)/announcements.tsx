import { PrimaryButton, SettingsButton } from "@/components/Buttons";
import { Topbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";
import { useRouter } from "expo-router";
import React from "react";

const Announcements = () => {
  const router = useRouter();
  return (
    <ScrollScreenView>
      <Topbar rightIcon={<SettingsButton />}>Announcements</Topbar>
      <PrimaryButton onPress={() => router.push("/cgu")}>CGU</PrimaryButton>
    </ScrollScreenView>
  );
};

export default Announcements;
