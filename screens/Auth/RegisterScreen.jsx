import React from "react";
import { DefaultTopbar, ScrollScreenContainer } from "../../components";
import { TEXT } from "../../constants";

const RegisterScreen = () => {
  return (
    <ScrollScreenContainer>
      <DefaultTopbar>{TEXT.authentification.register.title}</DefaultTopbar>
    </ScrollScreenContainer>
  );
};

export default RegisterScreen;
