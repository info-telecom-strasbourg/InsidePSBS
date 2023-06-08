import Topbar from "./Topbar";
import { TouchableBackIcon } from "../index";
import React from "react";

const BackButtonTopbar = ({ title }) => {
  return <Topbar title={title} leftIcon={<TouchableBackIcon />} />;
};

export default BackButtonTopbar;
