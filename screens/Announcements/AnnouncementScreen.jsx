import React, { useState } from "react";
import { ScrollScreenContainer, Topbar } from "../../components";
import { TEXT } from "../../constants";
import { View } from "react-native";
import Publication from "./Publication";
import { publications } from "../../data";
import PlusButton from "../../components/touchableicon/PlusButton";

const AnnouncementScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1));
    setRefreshing(false);
  };

  return (
    <>
      <ScrollScreenContainer>
        <Topbar>{TEXT.announcements.title}</Topbar>
        <View style={{ padding: 15 }}>
          <Publication data={publications[0]} />
          <Publication data={publications[0]} />
          <Publication data={publications[0]} />
        </View>
      </ScrollScreenContainer>
      <PlusButton />
    </>
  );
};

export default AnnouncementScreen;
