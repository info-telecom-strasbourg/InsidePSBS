import React from "react";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { TEXT } from "../../constants";
import { useFetch } from "../../hooks";
import { View } from "react-native";
import { useTheme } from "../../contexts";
import OrganizationButton from "./OrganizationButton";

const OrganizationsScreen = () => {
  const url = "https://fouaille.bde-tps.fr/api/organization";

  const { res, isLoading, error } = useFetch(url);
  const { theme } = useTheme();

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{TEXT.organizations.title}</BackButtonTopbar>
      {isLoading ? (
        <Loader />
      ) : (
        <View>
          <View style={{ alignItems: "center" }}></View>
          {res?.data.associations.map((association, index) => (
            <OrganizationButton key={index} data={association} />
          ))}
        </View>
      )}
    </ScrollScreenContainer>
  );
};

export default OrganizationsScreen;
