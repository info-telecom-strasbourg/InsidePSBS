import React from "react";
import { Topbar } from "../../components";
import { TEXT } from "../../constants";

const AnnouncementScreen = () => {
  return (
    <>
      <Topbar>{TEXT.announcements.title}</Topbar>
    </>
  );
};

export default AnnouncementScreen;
