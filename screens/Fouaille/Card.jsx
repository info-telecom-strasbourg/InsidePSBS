import React from "react";
import { Text, View } from "react-native";

import fouailleStyles from "./fouaille.style";
import { NetworkIcon } from "../../assets/icons";
import { TEXT } from "../../constants";
import { useTheme } from "../../contexts";

const Card = ({ money, firstname, lastname }) => {
  const styles = fouailleStyles();
  const { theme } = useTheme();

  return (
    <View style={styles.card.container}>
      <View style={styles.card.wrapper}>
        <View>
          <Text style={styles.card.title}>{TEXT.fouaille.card}</Text>
          <Text style={styles.card.money}>{money}€</Text>
        </View>
        <NetworkIcon color={theme.text} width={22} height={31} />
      </View>
      <Text style={styles.card.name}>
        {firstname} {lastname}
      </Text>
    </View>
  );
};

export default Card;