import React from "react";
import { Button, Text, View } from "react-native";
import { ScreenContainer } from "../components";
import BackButtonTopbar from "../components/topbar/BackButtonTopbar";
import { useNavigation } from "expo-router";

const Fouaille = () => {
  const navigation = useNavigation();
  return (
    <ScreenContainer>
      <Button title={"Go back"} onPress={() => navigation.goBack()} />
      <BackButtonTopbar />
    </ScreenContainer>
  );
};

export default Fouaille;
