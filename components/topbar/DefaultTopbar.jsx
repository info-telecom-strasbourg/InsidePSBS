import React from "react";

import Topbar from "./Topbar";
import { InsidePsbs } from "../../assets/icons";

const DefaultTopbar = ({ children, rightIcon }) => {
  return (
    <Topbar leftIcon={<InsidePsbs />} rightIcon={rightIcon}>
      {children}
    </Topbar>
  );
};

export default DefaultTopbar;
