import React from "react";
import { BackButtonTopbar } from "../../components";
import { TEXT } from "../../constants";

const OrganizationsScreen = () => {
  return (
    <>
      <BackButtonTopbar>{TEXT.organizations.title}</BackButtonTopbar>
    </>
  );
};

export default OrganizationsScreen;
