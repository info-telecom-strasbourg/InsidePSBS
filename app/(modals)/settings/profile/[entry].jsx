import React from "react";
import ProfileEditScreen from "../../../../screens/Settings/ProfileEditScreen";
import { useLocalSearchParams } from "expo-router";
import ProfileEditPassword from "../../../../screens/Settings/ProfileEditPassword";

const ProfileEntry = () => {
  const { entry } = useLocalSearchParams();
  if (entry === "password") return <ProfileEditPassword />;
  return <ProfileEditScreen />;
};

export default ProfileEntry;
