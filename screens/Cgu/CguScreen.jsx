import React from "react";
import { ScreenContainer } from "../../components";

import { BackButtonTopbar } from "../../components";
import { View, SafeAreaView } from "react-native";
import CGUText from "../../components/CGU";
const CguScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenContainer>
        <BackButtonTopbar rightIcon={<></>}>{"CGU"}</BackButtonTopbar>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 25,
            flex: 1,
          }}
        >
          <CGUText />
        </View>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default CguScreen;
