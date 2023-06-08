import Topbar from "./Topbar";
import { InsidePsbs } from "../../assets/icons";
import React from "react";

const DefaultTopbar = ({ title }) => {
  return <Topbar title={title} leftIcon={<InsidePsbs />} />;
};

export default DefaultTopbar;
