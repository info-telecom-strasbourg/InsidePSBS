import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { PrimaryButton } from "../../../components";
import { TEXT } from "../../../constants";
import { text_styles } from "../../../styles";
import { useTheme } from "../../../contexts";
import CheckBox from "expo-checkbox";

const Cgu = ({ nextStep }) => {
  const { width } = useWindowDimensions();
  const { theme } = useTheme();
  return (
    <View
      style={{
        width,
        padding: 15,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={text_styles.title2(theme)}>
          {TEXT.authentification.register.cgu}
        </Text>
        <View style={{ height: 30 }} />
        <Text style={text_styles.body3(theme)}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
          libero ornare, ornare nibh vel, dictum nulla. Donec porttitor diam
          quis mi lacinia, condimentum cursus tortor feugiat. Quisque mollis
          fringilla urna eget laoreet. Aliquam augue leo, dapibus sed sapien
          vel, ornare volutpat nibh. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. In orci nulla, viverra quis ullamcorper in, posuere
          id erat. Nullam interdum sapien eget euismod varius. Maecenas dapibus
          justo ut odio rhoncus blandit. Suspendisse in arcu lectus.
          Pellentesque tristique finibus ligula facilisis feugiat. Vestibulum
          luctus, massa et sagittis placerat, neque justo cursus neque, at
          ornare metus metus nec quam.
        </Text>
        <View style={{ height: 20 }} />
        <View style={{ flexDirection: "row" }}>
          <CheckBox />
          <View style={{ width: 10 }} />
          <Text style={text_styles.body3(theme)}>
            {TEXT.authentification.register.accept_cgu}
          </Text>
        </View>
        <View style={{ height: 20 }} />
      </View>
      <PrimaryButton
        text={TEXT.authentification.register.next}
        onPress={nextStep}
      />
    </View>
  );
};

export default Cgu;
