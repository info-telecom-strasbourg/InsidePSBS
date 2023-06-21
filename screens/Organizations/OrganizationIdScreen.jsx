import React from "react";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { useLocalSearchParams } from "expo-router";
import { useFetch } from "../../hooks";
import { TEXT } from "../../constants";
import { hideTextOverflow } from "../../utils";

const OrganizationIdScreen = () => {
  const params = useLocalSearchParams();
  const { res, isLoading, error } = useFetch(
    `https://fouaille.bde-tps.fr/api/organization/${params.id}`
  );

  const title =
    res?.data.acronym?.toUpperCase() ||
    res?.data.name ||
    TEXT.organizations.title;

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{hideTextOverflow(title, 12)}</BackButtonTopbar>
      {isLoading ? <Loader /> : <></>}
    </ScrollScreenContainer>
  );
};

export default OrganizationIdScreen;
