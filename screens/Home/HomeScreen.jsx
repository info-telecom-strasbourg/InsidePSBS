import React from "react";
import DefaultTopbar from "../../components/topbar/DefaultTopbar";
import { WidgetSection } from "./widgets";
import { TEXT } from "../../constants";

const HomeScreen = () => {
  return (
    <>
      <DefaultTopbar>{TEXT.common.app_name}</DefaultTopbar>
      <WidgetSection />
    </>
  );
};

export default HomeScreen;
