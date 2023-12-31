import { useLocalSearchParams } from "expo-router";
import React from "react";

import ProfileEditPassword from "../../../../screens/Settings/ProfileEditPassword";
import ProfileEditScreen from "../../../../screens/Settings/ProfileEditScreen";

const ProfileEntry = () => {
  const { entry } = useLocalSearchParams();
  if (entry === "password") return <ProfileEditPassword />;
  return <ProfileEditScreen />;
};

export default ProfileEntry;
