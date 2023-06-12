import Topbar from "./Topbar";
import TouchableBackIcon from "../touchableicon/TouchableBackIcon";
import React from "react";

const BackButtonTopbar = ({ children, rightIcon }) => {
  return (
    <Topbar rightIcon={rightIcon} leftIcon={<TouchableBackIcon />}>
      {children}
    </Topbar>
  );
};

export default BackButtonTopbar;
