import React, { useState } from "react";

import { DefaultTopbar, ScrollScreenContainer } from "../../components";
import WidgetSection from "./widgets/WidgetSection";
import { TEXT } from "../../constants";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
    fetch(url);
    setRefreshing(false);
  };
  return (
    <ScrollScreenContainer>
      <DefaultTopbar>{TEXT.common.app_name}</DefaultTopbar>
      <WidgetSection />
    </ScrollScreenContainer>
  );
};

export default HomeScreen;
