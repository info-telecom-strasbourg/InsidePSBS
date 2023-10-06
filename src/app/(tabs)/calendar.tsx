import { PrimaryButton, SettingsButton } from "@/components/Buttons";
import { Topbar } from "@/components/Topbar";
import { ScrollScreenView } from "@/components/Views";
import { useRouter } from "expo-router";
import React from "react";

const Calendar = () => {
  const router = useRouter();
  return (
    <ScrollScreenView>
      <Topbar rightIcon={<SettingsButton />}>Calendar</Topbar>
      <PrimaryButton onPress={() => router.push("/cgu")}>CGU</PrimaryButton>
    </ScrollScreenView>
  );
};

export default Calendar;
