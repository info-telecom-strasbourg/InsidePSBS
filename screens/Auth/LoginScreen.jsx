import React from "react";
import { DefaultTopbar } from "../../components";
import { TEXT } from "../../constants";

const LoginScreen = () => {
  return (
    <>
      <DefaultTopbar>{TEXT.authentification.login.title}</DefaultTopbar>
    </>
  );
};

export default LoginScreen;
