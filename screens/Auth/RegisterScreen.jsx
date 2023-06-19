import React from "react";
import { DefaultTopbar } from "../../components";
import { TEXT } from "../../constants";

const RegisterScreen = () => {
  return (
    <>
      <DefaultTopbar>{TEXT.authentification.register.title}</DefaultTopbar>
    </>
  );
};

export default RegisterScreen;
