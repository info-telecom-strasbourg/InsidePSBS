import React from "react";
import { ScrollScreenContainer, Topbar } from "../../components";
import { TEXT } from "../../constants";

const AnnouncementScreen = () => {
  return (
    <ScrollScreenContainer>
      <Topbar>{TEXT.announcements.title}</Topbar>
    </ScrollScreenContainer>
  );
};

export default AnnouncementScreen;
