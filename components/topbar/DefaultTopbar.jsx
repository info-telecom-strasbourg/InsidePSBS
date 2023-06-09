import Topbar from "./Topbar";
import { InsidePsbs } from "../../assets/icons";
import React from "react";

const DefaultTopbar = ({ children }) => {
  return <Topbar leftIcon={<InsidePsbs />}>{children}</Topbar>;
};

export default DefaultTopbar;
