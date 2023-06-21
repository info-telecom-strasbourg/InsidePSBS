import React, { useState } from "react";

import { DefaultTopbar, Loader, ScrollScreenContainer } from "../../components";
import WidgetSection from "./widgets/WidgetSection";
import { TEXT } from "../../constants";
import { RefreshControl } from "react-native";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1));
    setRefreshing(false);
  };

  return (
    <ScrollScreenContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <DefaultTopbar>{TEXT.common.app_name}</DefaultTopbar>
      {refreshing ? <Loader /> : <WidgetSection />}
    </ScrollScreenContainer>
  );
};

export default HomeScreen;
