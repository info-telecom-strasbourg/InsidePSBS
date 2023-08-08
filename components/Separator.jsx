import React from "react";
import { View } from "react-native";

const Separator = ({ vertical, horizontal, size }) => {
  return (
    <View
      style={{ height: vertical ? size : 0, width: horizontal ? size : 0 }}
    />
  );
};

export default Separator;
