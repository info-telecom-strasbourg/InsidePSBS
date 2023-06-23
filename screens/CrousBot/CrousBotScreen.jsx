import React from "react";
import { ScrollScreenContainer, Topbar } from "../../components";
import { TEXT } from "../../constants";
import { getMenuIllkirch } from "./CrousApi";
const CrousBotScreen = () => {
    // console.log(getMenuIllkirch());
  return (
    <ScrollScreenContainer>
      <Topbar>{TEXT.crousbot.page_name}</Topbar>
    </ScrollScreenContainer>
  );
};

export default CrousBotScreen;
