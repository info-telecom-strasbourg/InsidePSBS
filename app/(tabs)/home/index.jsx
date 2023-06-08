import React from "react";
import ColoredButton from "../../../components/buttons/ColoredButton";
import { COLORS } from "../../../constants";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../components/buttons/SecondaryButton";

const Home = () => {
  return (
    <>
      <ColoredButton
        text="Suivant"
        color="white"
        backgroundColor={COLORS.dark_red}
      />
      <SecondaryButton text="Bouton" />
    </>
  );
};

export default Home;
