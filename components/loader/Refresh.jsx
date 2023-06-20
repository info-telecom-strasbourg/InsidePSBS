import React from "react";
import { RefreshControl } from "react-native";

const Refresh = ({ onRefresh, refreshing, setRefreshing }) => {
  const handleRefresh = () => {
    setRefreshing(true);
    onRefresh();
    setRefreshing(false);
  };

  return <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />;
};

export default Refresh;
