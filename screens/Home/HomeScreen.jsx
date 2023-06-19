import React from "react";

import { DefaultTopbar } from "../../components";
import WidgetSection from "./widgets/WidgetSection";
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
