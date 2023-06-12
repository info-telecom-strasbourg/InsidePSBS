import Topbar from "./Topbar";
import TouchableBackIcon from "../touchableicon/TouchableBackIcon";
import React from "react";

const BackButtonTopbar = ({ children }) => {
  return <Topbar leftIcon={<TouchableBackIcon />}>{children}</Topbar>;
};

export default BackButtonTopbar;
