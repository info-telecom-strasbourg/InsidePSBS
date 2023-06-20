import React from "react";
import { useTheme } from "../contexts";
import { StatusBar as Status } from "expo-status-bar";

const StatusBar = () => {
  const { theme } = useTheme();
  return <Status backgroundColor={theme.background} translucent={false} />;
};

export default StatusBar;
