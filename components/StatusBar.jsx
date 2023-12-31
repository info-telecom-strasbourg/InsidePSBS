import { StatusBar as Status } from "expo-status-bar";
import React from "react";

import { useTheme } from "../contexts";

const StatusBar = () => {
  const { theme } = useTheme();
  return <Status backgroundColor={theme.background} translucent={false} />;
};

export default StatusBar;
