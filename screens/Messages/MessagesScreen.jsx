import React from "react";

import { ScrollScreenContainer, Topbar } from "../../components";
import { TEXT } from "../../constants";

const MessagesScreen = () => {
  return (
    <ScrollScreenContainer>
      <Topbar>{TEXT.messages.title}</Topbar>
    </ScrollScreenContainer>
  );
};

export default MessagesScreen;
