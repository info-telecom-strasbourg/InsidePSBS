import React from "react";

import Topbar from "./Topbar";
import { InsidePsbs } from "../../assets/icons";

const DefaultTopbar = ({ children }) => {
  return <Topbar leftIcon={<InsidePsbs />}>{children}</Topbar>;
};

export default DefaultTopbar;
