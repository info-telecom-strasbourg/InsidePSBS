import React from "react";
import { Topbar } from "../../components";
import { TEXT } from "../../constants";

const MessagesScreen = () => {
  return (
    <>
      <Topbar>{TEXT.messages.title}</Topbar>
    </>
  );
};

export default MessagesScreen;
