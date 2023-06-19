import React from "react";

import Topbar from "./Topbar";
import TouchableBackIcon from "../touchableicon/TouchableBackIcon";

const BackButtonTopbar = ({ children, rightIcon }) => {
  return (
    <Topbar rightIcon={rightIcon} leftIcon={<TouchableBackIcon />}>
      {children}
    </Topbar>
  );
};

export default BackButtonTopbar;
