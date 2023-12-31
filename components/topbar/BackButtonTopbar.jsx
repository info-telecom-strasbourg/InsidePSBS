import { useRouter } from "expo-router";
import React from "react";

import Topbar from "./Topbar";
import TouchableBackIcon from "../touchableicon/TouchableBackIcon";

const BackButtonTopbar = ({ children, rightIcon, onPress }) => {
  const router = useRouter();
  return (
    <Topbar
      rightIcon={rightIcon}
      leftIcon={<TouchableBackIcon onPress={onPress} />}
      onPress={onPress ? onPress : () => router.back()}>
      {children}
    </Topbar>
  );
};

export default BackButtonTopbar;
